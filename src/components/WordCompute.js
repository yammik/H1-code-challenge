import React, { Component } from 'react';
import WordMap from './WordMap';
import { Button } from 'react-bootstrap';

export default class WordCompute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  handleClick = (e) => {
    this.props.getStatesData(this.formatDictionary);
  }

  arrayToWords = (array) => {
    return array.join(' ').replace('.','').split(' ');
  }

  formatDictionary = (resp) => {
    const descriptions = resp.loans.map(l => l.desc);
    let result = [];
    const words = this.arrayToWords(descriptions);
    for (let i = 0; i < words.length; i++) {
      if (words[i]) { // only count real words
        const w = words[i].toLowerCase();
        const oldValue = result.find(r => r.text === w)
        // word frequency counter, but in the format required for react-d3-cloud
        if (oldValue) {
          const newCount = { text: w, value: oldValue.value + 1 }
          result = [...result.filter(r => r.text !== w), newCount];
        } else {
          result.push({ text: w, value: 1 });
        }
      }
    }
    return { [resp.state.abbr]: result }
  }


  render() {
    // renders really slow, so I'm only rendering data of the first 5 states

    return (
      <div className="stationary-scroll">
        <Button onClick={this.handleClick}>sorry I'm slow</Button>

        {this.props.data.slice(0, 5).map(stateData => (
          <div key={Object.keys(stateData)[0]} className="word-cloud">
            <h4>{Object.keys(stateData)[0]}</h4>
            <WordMap calculatedData={stateData} />
          </div>
        ))}
      </div>
    )
  }
}
