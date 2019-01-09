import React, { Component } from 'react';
import OptionsForm from './OptionsForm';
import { Button } from 'react-bootstrap';


export default class Controller extends Component { // could be functional
  setPurposeId = (e) => {
    this.props.setOption("purposeId", e.target.value);
  }
  setStateId = (e) => {
    this.props.setOption("stateId", e.target.value);
  }

  makeCategoryOptions = (purpose) => {
    return <option key={purpose.id} name="purposeId" value={purpose.id}>{this.formatName(purpose.category)}</option>;
  }
  makeStateOptions = (state) => {
    return <option key={state.id} name="stateId" value={state.id}>{state.abbr}</option>;
  }

  formatName = (str) => {
    return str ? (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/, ' ') : '';
  }


  handleClick = (e) => {
    // this populates the data in App Component
    // the updated data is passed to the formatting/computing components
    switch (this.props.appState.currentKey) {
      case 0:
        this.props.getStatesData();
        break;
      case 1:
        this.props.getOneStateData(this.props.appState.stateId);
        break;
      default:
        break;
    };
  }

  render() {
    return (
      <div className="menu">
        <OptionsForm
          label="loan category"
          iterable={this.props.appState.allPurposes}
          handleSelect={this.setPurposeId}
          makeOptions={this.makeCategoryOptions} />

        {this.props.appState.currentKey === 1 &&
          <OptionsForm
            label="state"
            iterable={this.props.appState.allStates}
            handleSelect={this.setStateId}
            makeOptions={this.makeStateOptions}
          />}
        <Button onClick={this.handleClick}>take it away</Button>
      </div>
    )
  }
}
