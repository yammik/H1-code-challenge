import React from 'react';
import WordCloud from 'react-d3-cloud';

export default class WordMap extends React.Component {

  // without this lifecycle method, browser will bug out
  // this effectively gives d3 full control over DOM without React competing for it as usual
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const fontSizeMapper = (word) => Math.log2(word.value) * 5;
    const data = this.props.calculatedData.length > 0 ? Object.values(this.props.calculatedData) : [];
    return (
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
      />

    )
  }
}
