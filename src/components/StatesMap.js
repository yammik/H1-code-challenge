import React, { Component } from 'react';
import USAMap from "react-usa-map";
import ReactTooltip from 'react-tooltip'


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


  toggleHoverState = () => {
    this.setState({
      isHovering: true,
    })
  }

  handleMouseOver = (e) => {
    if (e.target.tagName === 'path' && e.target.classList.value.includes("state")) {
      // only fire when hovering over a state path
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
    if (usState) {
      this.setState({
        hoveringOver: usState.abbr,
        hoverLoan: usState.loanSum,
        dataTip: this.toolTipContent(usState.abbr, usState.loanSum),
      })
    } else {
      this.setState({
        dataTip: "no data here (yet) 👀",
      })
    }
  }

  toolTipContent = (stateName, stateLoan) => {
    // makes the text content of tooltip
    return `People in ${stateName} borrowed $${stateLoan ? this.props.formatDollars(stateLoan) : 0.00}`;
  }


  formatStatesConfig = (statesData) => {
    // this function is responsible for the color displaying on each state
    return statesData.reduce((accumulator, state) => {
      return {...accumulator,
        [state.abbr]: {
          fill: state.color,
        }
      }
    }, {})
  }


  render() {
    const config = this.formatStatesConfig(this.props.calculatedData);
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
