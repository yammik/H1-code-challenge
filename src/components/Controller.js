import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


export default class Controller extends Component {

  handleSelect = (e) => {
    this.props.setPurpose(e.target.value);
  }

  makeCategoryOptions = (purpose) => {
    return <option key={purpose.id} value={purpose.id}>{this.formatName(purpose.category)}</option>
  }

  formatName = (str) => {
    return str ? (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/, ' ') : '';
  }

  render() {
    return (
      <div className="controller">
        <FormGroup controlId="formControlsSelect" onChange={this.handleSelect}>
          <ControlLabel>Select a loan category</ControlLabel>
          <FormControl componentClass="select">
            {this.props.appState.allPurposes.map(this.makeCategoryOptions)}
          </FormControl>
        </FormGroup>
      </div>
    )
  }
} // end class Controller
