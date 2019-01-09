import React from 'react';
import WordMap from './WordMap';


const arrayToWords = (array) => {
  return array.join(' ').split(' ');
}

const formatDictionary = (loans) => {
  const commonWords = 'a an the in and for or it its to too of this that my be is are were was them has will am on have > - _ i\'m';
  const descriptions = loans.map(l => l.desc);
  let result = [];
  const words = arrayToWords(descriptions);

  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      // only count real words
      const w = words[i].toLowerCase().replace(/\./g, '');

      if (commonWords.includes(w)) continue; // don't want particles

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

function WordCompute(props) {
  // way too expensive to render all states at once; only show data for one selected state
  const dictionary = props.data.length > 0 ? formatDictionary(props.data[0].loans) : null;
  return (
    <div className="map-container">
      { dictionary && <WordMap calculatedData={dictionary} /> }
    </div>
  )
}

export default WordCompute;
