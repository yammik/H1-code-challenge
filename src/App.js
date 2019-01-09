import React, { Component } from 'react';
import './App.css';
import Controller from './components/Controller';
import FormatMap from './components/FormatMap';
import WordCompute from './components/WordCompute';
import { ProgressBar, Tabs, Tab } from 'react-bootstrap';

const Api = require('./lib/Api.js')


class App extends Component {
  constructor() {
    super();
    this.state = {
      allStates: [],
      allPurposes: [],
      purposeId: "1",
      stateId: "1",
      currentKey: 0,
      data: [],
      maxData: 0,
    }
  }

  componentDidMount() {
    // load the lighter part of the data
    Api.getUSStates()
      .then(resp => {
        this.setState({
          allStates: resp.states,
        })
      })

    Api.getPurposes()
      .then(resp => {
        this.setState({
          allPurposes: resp.purposes,
        })
      })
  }


  updateData = (result) => {
    this.setState(prevState => {
      return {
        data: [...prevState.data, result],
      };
    }, () => {
      this.updateProgress(this.state.data.length);
    });
  }

  getStatesData = () => {
    this.loadingStarted();
    this.setState({ maxData: 51 });
    this.state.allStates.forEach(state => {
      Api.getUSStateAndLoans(state.id, this.state.purposeId)
        .then(resp => {
          this.updateData(resp);
        });
    })
  }

  getOneStateData = (stateId) => {
    // not useful for displaying map, but faster for word cloud to grab one set at a time
    this.loadingStarted();
    this.setState({ maxData: 1 });
    Api.getUSStateAndLoans(stateId, this.state.purposeId)
      .then(resp => {
        this.updateData(resp);
      })
  }


  loadingStarted = () => {
    this.setState({
      fullyLoaded: false,
      progress: 0,
      data: [],
    });
  }

  updateProgress = (prog) => {
    // based on the number of 51 states
    // when all information about all states are updated, progress bar disappears
    const perc = prog / this.state.maxData * 100;
    if (perc < 100) {
      this.setState({
        progress: perc,
      });
    } else {
      this.loadingCompleted();
    }
  }

  loadingCompleted = () => {
    this.setState({
      fullyLoaded: true,
      maxData: 0,
    })
  }


  handleTabSelect = (currentKey) => {
    this.setState({ currentKey })
  }

  setOption = (key, value) => {
    this.setState({
      [key]: value,
    })
  }


  render() {
    const { currentKey, fullyLoaded, data, progress } = this.state;
    return (
      <div>
        <Controller
          appState={this.state}
          getStatesData={this.getStatesData}
          getOneStateData={this.getOneStateData}
          setOption={this.setOption} />
        {!fullyLoaded && <ProgressBar id="progress-bar" active now={progress} />}
        <Tabs
          activeKey={currentKey}
          onSelect={this.handleTabSelect}
          id={1}
        >
          <Tab eventKey={0} title="Geographical Map" >
            {currentKey === 0 &&
              <FormatMap
                data={data}
                getStatesData={this.getStatesData}
                appState={this.state}
              />
            }
          </Tab>
          <Tab eventKey={1} title="Word Cloud" >
            {currentKey === 1 &&
              <WordCompute
                data={data}
                getOneStateData={this.getOneStateData}
                updateMaxData={this.updateMaxData}
                appState={this.state}
              />
            }
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default App;
