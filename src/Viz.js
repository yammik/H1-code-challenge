import React, { Component } from 'react';
import StatesMap from './components/StatesMap';
import { ProgressBar } from 'react-bootstrap';
const Api = require('./lib/Api.js')

export default class Viz extends Component {
  constructor(props) {
    super(props);
    // state containing any data stuff pertinent to visualization :
    this.state = {
      stateData: [],
      maxLoan: 0,
      fullyLoaded: true, // set to false as soon as API call starts
      progress: 100, //
    }

    this.getStateLoans = this.getStateLoans.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appState.purposeId !== this.props.appState.purposeId) {
      this.getStateLoans();
    }
  }

  loadingStarted = () => {
    this.setState({
      fullyLoaded: false,
      progress: 0,
      stateData: [],
    })
  }

  updateProgress = () => {
    // based on the number of 51 states
    // when all information about all states are updated, progress bar disappears
    const perc = this.state.stateData.length / 51 * 100;
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

  // when a loan purpose is set, look up each state's loans and filter those matching that category
  getStateLoans = () => {
    this.loadingStarted();
    this.props.appState.allStates.forEach(state => {
      return Api.getUSState(state.id, this.props.appState.purposeId)
        .then(resp => {
          const loans = resp.loans;
          const loanSum = this.getLoanSum(loans);
          const result = {
            abbr: resp.state.abbr,
            loanSum: loanSum,
            color: this.formatStateColor(loanSum),
          }
          // because API for each state is being called like this, there's a lot of async stuff happening simultaneously
          this.setState(prevState => {
            return {
              stateData: [...prevState.stateData, result],
            }
          }, () => {
            this.updateProgress();
          })
        })
    })

  }


  // would be nice to run this once after all states are updated
  addColor = () => {
    const stateDataWithColor = this.state.stateData.map(state => {
      return {...state, color: this.percentToColor(state.loanSum / this.state.maxLoan * 100)}
    })
    this.setState({
      stateData: stateDataWithColor,
    });
  }

  filterLoans = (loans, purposeId) => {
    return loans.filter(loan => loan.purpose_id === parseInt(purposeId))
  }

  getLoanSum = (loans) => {
    const sum = loans.reduce((accumulator, loan) => accumulator + loan.loan_amnt, 0);
    if (this.state.maxLoan < sum) {
      this.setState({
        maxLoan: sum,
      })
    }
    return sum;
  }


  // dynamic coloring
  percentToColor = (percent) => {
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


  // non-dynamic coloring
  formatStateColor = (loanSum) => {
    const legendData = [
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

    // ideally, the data should be normalized to the respective state's population

    for (let i = 0; i < legendData.length; i++) {
      if (loanSum < legendData[i].interval) {
        return legendData[i].color;
      }
    };
    return '#0B5345';
  }


  render() {
    return (
      <div className="viz">
        {!this.state.fullyLoaded && <ProgressBar active now={this.state.progress} />}
        <StatesMap calculatedData={this.state.stateData} />
      </div>
    )
  }
}
