import React from 'react';


function Legend(props) {
  const legendData = props.colorLegend();

  return (
    <div id="legend-box">
      {legendData.map((l,i) => <LegendElement key={i} color={l.color} interval={props.formatDollars(l.interval)} />)}
    </div>
  )
}

function LegendElement(props) {
  return (
    <div className="legend"
      style={{"backgroundColor": props.color}}>
      <span>
        ${props.interval}+
      </span>
    </div>
  )
}

export default Legend;
