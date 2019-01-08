import React, { Component } from 'react';
import USAMap from "react-usa-map";

// tried using d3, but wasn't comfortable with its clash with React over DOM control
// seems cool and useful but would only learn it for a longer term project. It's a bit of an overkill for this since the map isn't really interactive

// for the purposes of this app, USAMap gets the job done nice and easy 👍 don't even need to load in external topography data

export default class StatesMap extends Component {
  constructor(props) {
    super(props);
  }

  statesCustomConfig = (statesData) => {
    return statesData.reduce((accumulator, state) => {
      return {...accumulator,
        [state.abbr]: {
          fill: state.color,
        }
      }
    }, {})
  }

  render() {
    const config = this.statesCustomConfig(this.props.calculatedData);
    return (
      <div className="container">
        <div className="anchor">
          <USAMap customize={config} />
        </div>
      </div>
    );
  }
}
