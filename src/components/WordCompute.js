import React, { Component } from 'react';
import WordMap from './WordMap';


export default class WordCompute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  // there was probably some word-parsing library I could have used...
  arrayToWords = (array) => {
    return array.join(' ').split(' ');
  }

  formatDictionary = (data) => {
    const commonWords = 'a an the in and for or it its to too of this that my be is are were was them has will am on have';
    const descriptions = data.loans.map(l => l.desc);
    let result = [];
    const words = this.arrayToWords(descriptions);
    for (let i = 0; i < words.length; i++) {
      if (words[i]) { // only count real words
        const w = words[i].toLowerCase().replace(/\./g, '');
        if (commonWords.includes(w)) continue;
        const oldValue = result.find(r => r.text === w);
        // word frequency counter, but in the format required for react-d3-cloud
        if (oldValue) {
          const newCount = { text: w, value: oldValue.value + 1 };
          result = [...result.filter(r => r.text !== w), newCount];
        } else {
          result.push({ text: w, value: 1 });
        }
      }
    }
    return result;
  }


  render() {
    // way too expensive to render all states at once; only show data for one selected state
    const dictionary = this.props.data.length > 0 ? this.formatDictionary(this.props.data[0]) : null;
    return (
      <div className="map-container">
          { dictionary && <WordMap calculatedData={dictionary} /> }
      </div>
    )
  }
}
