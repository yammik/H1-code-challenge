import React, { Component } from 'react';
import FormatMap from './FormatMap';
import WordCompute from './WordCompute';
import { ProgressBar, Tabs, Tab } from 'react-bootstrap';
const Api = require('../lib/Api.js')

// The two analyses share some functions in common. Viz (Visualization) class contains the shared methods
// e.g. loading status
export default class Viz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullyLoaded: true,
      progress: 100,
      data: [],
      currentKey: 1,
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
    // only going through data for 4 states because ain't nobody got time for that
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

    // for full set, percentage should be out of 51. 4 is only for demo purposes
    // const perc = prog / 4 * 100;
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
    const { currentKey, fullyLoaded, data, progress } = this.state;

    return (
      <div className="viz">
        {!fullyLoaded && <ProgressBar id="progress-bar" active now={progress} />}
        <Tabs
          activeKey={currentKey}
          onSelect={this.handleTabSelect}
          id={1}
        >
            <Tab eventKey={1} title="Geographical Map" >
              {currentKey === 1 &&
                <FormatMap
                  currentKey={currentKey}
                  data={data}
                  getStatesData={this.getStatesData}
                  appState={this.props.appState}
                />
              }
            </Tab>
            <Tab eventKey={2} title="Word Cloud" >
              {currentKey === 2 &&
                <WordCompute
                  currentKey={currentKey}
                  data={data}
                  getStatesData={this.getStatesData}
                  appState={this.props.appState}
                />
              }
            </Tab>

        </Tabs>;
      </div>
    )
  }
}
