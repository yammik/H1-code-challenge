import React, { Component } from 'react';
import USAMap from "react-usa-map";
import ReactTooltip from 'react-tooltip'


// tried using d3, but wasn't comfortable with its clash with React over DOM control
// seems cool and useful but would only learn it for a longer term project. It's a bit of an overkill for this since the map isn't really interactive

// for the purposes of this app, USAMap gets the job done nice and easy 👍 don't even need to load in external topography data

export default class StatesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      hoveringOver: '',
      hoverLoan: 0,
      dataTip: '',
    }
  }

  // this function is responsible for the color displaying on each state
  statesCustomConfig = (statesData) => {
    return statesData.reduce((accumulator, state) => {
      return {...accumulator,
        [state.abbr]: {
          fill: state.color,
        }
      }
    }, {})
  }

  handleMouseOver = (e) => {
    // only fire when hovering over a state path
    if (e.target.tagName === 'path' && e.target.classList.value.includes("state")) {
      const state = this.props.calculatedData.find(st => st.abbr === e.target.classList[0]);
      this.toggleHoverState();
      this.setHoveringState(state);
    } else {
      this.setState({
        isHovering: false,
      })
    }
  }

  setHoveringState = (usState) => {
    // grabs name and total loan of the usState being hovered over
    // makes the text content of tooltip
    if (usState) {
      this.setState({
        hoveringOver: usState.abbr,
        hoverLoan: usState.loanSum,
        dataTip: this.toolTipContent(usState.abbr, usState.loanSum),
      })
    } else {
      this.setState({
        dataTip: "no data here (yet)",
      })
    }
  }

  toggleHoverState = () => {
    this.setState({
      isHovering: true,
    })
  }

  toolTipContent = (stateName, stateLoan) => {
    return `People in ${stateName} took out $${stateLoan ? this.props.formatDollars(stateLoan) : 0.00}`;
  }


  render() {
    const config = this.statesCustomConfig(this.props.calculatedData);
    return (
      <div className="container">
        <div className="anchor" onMouseOver={this.handleMouseOver} data-tip data-for='toolTip'>
          <USAMap customize={config} />
        </div>
        {this.state.isHovering && <ReactTooltip id="toolTip" place="bottom" type="dark" effect="float">
          <span>{this.state.dataTip}</span>
        </ReactTooltip>}
      </div>
    );
  }
}
