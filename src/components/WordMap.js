import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud';


export default class WordMap extends Component {
  // without this lifecycle method, browser will bug out
  // this effectively gives d3 full control over DOM without React competing for it as usual
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const fontSizeMapper = (word) => Math.log2(word.value) * 5;

    const data = this.props.calculatedData.length > 0 ? Object.values(this.props.calculatedData) : [];
    // only show the top 800 words because each word becomes a DOM node; gets heavy
    const shorterData = data.sort((x, y) => y.value - x.value).slice(0, 800);
    console.log(shorterData);
    return (
      <WordCloud
        data={shorterData}
        fontSizeMapper={fontSizeMapper}
      />

    )
  }
}
