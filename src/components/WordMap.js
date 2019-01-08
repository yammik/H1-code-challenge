import React from 'react';
import WordCloud from 'react-d3-cloud';

function WordMap(props) {
//   props data should have the following structure:
    const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 1000000 },
      { text: 'duck', value: 10 },
    ];
  const fontSizeMapper = word => Math.log2(word.value) * 5;
  const rotate = word => word.value % 360;
  // const data = Object.values(props.calculatedData)

  return (
    <WordCloud
      data={data}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}
    />
  )
}

export default WordMap;