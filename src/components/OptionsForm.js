import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

function OptionsForm(props) {
  return (
    <FormGroup controlId="formControlsSelect" onChange={props.handleSelect}>
      <ControlLabel>Select a {props.label}</ControlLabel>
      <FormControl componentClass="select">
        {props.iterable.map(props.makeOptions)}
      </FormControl>
    </FormGroup>
  )
}

export default OptionsForm;
