import React, { Component } from 'react';
import WordMap from './WordMap';

export default class WordCompute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentKey === 2) {
      // only evalutate if the corresponding tab is active
      if (prevProps.appState.purposeId !== this.props.appState.purposeId) {
        // if on the right tab, only update if loan purpose is changed
        // this.props.getStatesData(this.formatDictionary);
      } else if (prevProps.currentKey !== this.props.currentKey) {
        // if the loan purpose was not updated, update if tab is activated
        // this.props.getStatesData(this.formatDictionary);
      }
    }
  }

  formatDictionary = (resp) => {
    // should parse into the format Word Cloud takes in here
    const descriptions = resp.loans.map(l => l.desc);
    let result = [];
    const words = descriptions.join(' ').split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i]) { // only count real words
        const w = words[i].toLowerCase();
        if (result.find(r => r.text === w)) {
          const newCount = {
            text: w,
            value: result.find(r => r.text === w).value + 1,
          }
          result = [...result.filter(r => r.text !== w), newCount];
        } else {
          result.push({
            text: w,
            value: 1,
          })
        }
      }

    }
    return { [resp.state.abbr]: result }
  }


  render() {
    return (
      <div>
        {this.props.data.map(stateData => <WordMap calculatedData={stateData} />)}
      </div>
    )
  }



}
