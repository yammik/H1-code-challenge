import React, { Component } from 'react';
import WordMap from './WordMap';
import OptionsForm from './OptionsForm';
import { Button } from 'react-bootstrap';


export default class WordCompute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }


  arrayToWords = (array) => {
    return array.join(' ').replace('.','').split(' ');
  }

  formatDictionary = (data) => {
    const commonWords = 'a an the in and for or it its to too of this that my be is are were was them'
    const descriptions = data.loans.map(l => l.desc);
    let result = [];
    const words = this.arrayToWords(descriptions);
    for (let i = 0; i < words.length; i++) {
      if (words[i]) { // only count real words
        const w = words[i].toLowerCase();
        if (commonWords.includes(w)) continue;
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
    return result;
  }


  render() {
    // way too expensive to render all states at once; only show data for selected state
    const dictionary = this.props.data.length > 0 ? this.formatDictionary(this.props.data[0]) : null;
    return (
      <div className="scrolling-wrapper">
          { dictionary && <WordMap calculatedData={dictionary} /> }
      </div>
    )
  }
}
