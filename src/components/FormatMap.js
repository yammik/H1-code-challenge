import React, { Component } from 'react';
import StatesMap from './StatesMap';
import Legend from './Legend';
import { Button } from 'react-bootstrap';

export default class FormatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maxLoan: 0,
    }
  }

  handleClick = (e) => {
    this.props.getStatesData(this.formatMapResults);
  }

  formatMapResults = (resp) => {
    const loans = resp.loans;
    const loanSum = this.getLoanSum(loans);
    const result = {
      abbr: resp.state.abbr,
      loanSum: loanSum,
      color: this.formatStateColor(loanSum),
    }
    return result;
  }

  getLoanSum = (loans) => {
    return loans.reduce((accumulator, loan) => accumulator + loan.loan_amnt, 0);
  }

  percentageBasedColor = () => {
    // percentage-based coloring; can be dynamic
    // Limitations: don't quite know the min-max range until information about all 51 states is obtained
    // would be bad UX to make user wait 15s until they see colors appear on the screen
    // maybe use when loading takes less than 3s
    // also probably not good for exponential scales
    const stateDataWithColor = this.state.data.map(state => {
      return {...state, color: this.percentToColor(state.loanSum / this.state.maxLoan * 100)}
    })
    this.setState({
      data: stateDataWithColor,
    });
  }
  setMaxSum = (sum) => {
    // goes with percentageBasedColor
    if (this.state.maxLoan < sum) {
      this.setState({
        maxLoan: sum,
      })
    }
  }
  percentToColor = (percent) => {
    // red-yellow-green gradient; give it a percentage, you get the corresponding color back
    let r, g, b = 0;
    if (percent < 50) {
      r = 255;
      g = Math.round(5.1 * percent);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * percent);
    }
    const h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }
  colorLegend = () => {
    return [
      {'interval': 1000, 'color': '#E8F6F3'},
      {'interval': 5000, 'color': '#D0ECE7'},
      {'interval': 10000, 'color': '#A2D9CE'},
      {'interval': 50000, 'color': '#73C6B6'},
      {'interval': 100000, 'color': '#45B39D'},
      {'interval': 500000, 'color': '#16A085'},
      {'interval': 1000000, 'color': '#117A65'},
      {'interval': 5000000, 'color': '#117A65'},
      {'interval': 10000000,'color': '#0E6655'}
    ];
  }

  // non-dynamic coloring but pretty green gradient; easy on the eyes
  formatStateColor = (loanSum) => {
    // ideally, the data should be normalized to the respective state's population
    const legendData = this.colorLegend();
    for (let i = 0; i < legendData.length; i++) {
      if (loanSum < legendData[i].interval) {
        return legendData[i].color;
      }
    };
    return '#0B5345';
    // should add a legend denoting what the colors represent
  }

  formatDollars = (num) => {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    return (
      <div className="stationary-scroll">
        <Button onClick={this.handleClick}>take me away</Button>
        <StatesMap formatDollars={this.formatDollars} calculatedData={this.props.data} />
        <Legend formatDollars={this.formatDollars} colorLegend={this.colorLegend} />
      </div>
    )
  }


}
