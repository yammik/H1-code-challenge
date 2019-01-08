import React, { Component } from 'react';
import StatesMap from './components/StatesMap';
const Api = require('./lib/Api.js')

export default class Viz extends Component {
  constructor(props) {
    super(props);
    // state containing any data stuff pertinent to visualization :
    this.state = {
      stateData: [],
      maxLoan: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appState.purposeId !== this.props.appState.purposeId) {
      this.getStateLoans();
    }
  }

  // when a loan purpose is set, look up each state's loans and filter those matching that category
  getStateLoans = () => {
    const x = this.props.appState.allStates.map(state => {
      return Api.getUSState(state.id)
        .then(resp => {
          // filter loans matching that category
          const loans = this.filterLoans(resp.loans, this.props.appState.purposeId);

          const result = {
            abbr: resp.state.abbr,
            loanSum: this.getLoanSum(loans),
          }
          this.setState(prevState => {
            return {
              stateData: [...prevState.stateData, result],
            }
          })
        })
        .then(() => {
          const stateDataWithColor = this.state.stateData.map(state => {
            return {...state, color: this.percentToColor(state.loanSum / this.state.maxLoan * 100)}
          })
          this.setState({
            stateData: stateDataWithColor,
          })
        })
    })

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

  formatStateColor = (loanSum) => {
    const legendData = [
      {'interval': 1000, 'color': 'purple'},
      {'interval': 5000, 'color': 'darkorchid'},
      {'interval': 10000, 'color': 'mediumpurple'},
      {'interval': 50000, 'color': 'lightskyblue'},
      {'interval': 100000, 'color': 'khaki'},
      {'interval': 500000, 'color': 'orange'},
      {'interval': 1000000, 'color': 'salmon'},
      {'interval': 5000000, 'color': 'indianred'},
      {'interval': 10000000,'color': 'darkred'}
    ];

    // ideally, the data should be normalized to the respective state's population

    for (let i = 0; i < legendData.length; i++) {
      if (loanSum < legendData[i].interval) {
        return legendData[i].color;
      }
    };
    return 'darkred';
  }


  render() {
    return (
      <div className="viz">
        <StatesMap appState={this.props.appState} calculatedData={this.state.stateData} />
      </div>
    )
  }
}
