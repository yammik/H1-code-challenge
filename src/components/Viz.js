import React, { Component } from 'react';
import StatesMap from './StatesMap';
import VizMap from './VizMap';
import WordCompute from './WordCompute';
import { ProgressBar, Tabs, Tab } from 'react-bootstrap';
const Api = require('../lib/Api.js')

export default class Viz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullyLoaded: true, // set to false as soon as API call starts
      progress: 100, //
      currentKey: 1,
      data: [],

    }
  }

  loadingStarted = () => {
    this.setState({
      fullyLoaded: false,
      progress: 0,
      data: [],
    })
  }

  updateData = (result) => {
    this.setState(prevState => {
      return {
        data: [...prevState.data, result],
      }
    }, () => {
      this.updateProgress(this.state.data.length);
    })
  }

  getStatesData = (cb) => { // takes in a callback to format the results, to get the specific info we might need
    this.loadingStarted();
    this.props.appState.allStates.forEach(state => {
      return Api.getUSState(state.id, this.props.appState.purposeId)
        .then(resp => {
          const result = cb(resp);
          this.updateData(result);
        })
    })
  }

  updateProgress = (prog) => {
    // based on the number of 51 states
    // when all information about all states are updated, progress bar disappears
    const perc = prog / 51 * 100;
    if (perc < 100) {
      this.setState({
        progress: perc,
      })
    } else {
      this.loadingCompleted();
    }
  }

  loadingCompleted = () => {
    this.setState({
      fullyLoaded: true,
    })
  }

  handleTabSelect = (currentKey) => {
    this.setState({ currentKey })
  }


  render() {
    return (
      <div className="viz">
        {!this.state.fullyLoaded && <ProgressBar id="progress-bar" active now={this.state.progress} />}
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleTabSelect}
        >
          <Tab eventKey={1} title="Geographical Map">
            <VizMap
              currentKey={this.state.currentKey}
              data={this.state.data}
              getStatesData={this.getStatesData}
              appState={this.props.appState} />
          </Tab>
          <Tab eventKey={2} title="Word Cloud">
            <WordCompute
              currentKey={this.state.currentKey}
              data={this.state.data}
              getStatesData={this.getStatesData}
              appState={this.props.appState}
            />
          </Tab>
        </Tabs>;
      </div>
    )
  }
}
