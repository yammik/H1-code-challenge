import React, { Component } from 'react';
import './App.css';
import Controller from './Controller';
import Viz from './Viz';
const Api = require('./lib/Api.js')


class App extends Component {
  constructor() {
    super();
    this.state = {
      allStates: [],
      usState: '',
      allPurposes: [],
      purposeId: '',
    }
  }

  componentDidMount() {
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



  setPurpose = (value) => {
    this.setState({
      purposeId: value,
    })
  }


  render() {
    return (
      <div>
        <Controller appState={this.state} setPurpose={this.setPurpose} />
        <Viz appState={this.state} />
      </div>
    );
  }
}

export default App;
