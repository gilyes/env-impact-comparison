import React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from 'react-chartkick';
import './style.scss'

const TNGChart = (props) => {
  return (
    <div>
      <PieChart data={props.tng.tng} donut={true} legend="right" library={{
        backgroundColor: "transparent",
        fontSize: "14",
        pieHole: 0.45,
        sliceVisibilityThreshold: 0.0001,
        legend: { textStyle: { color: '#eeeeee', fontSize: "15" } },
        chartArea: { top: 9, bottom: 9, left: 5, right: 5 },
        tooltip: { text: 'percentage', showColorCode: true }
      }} />
      {props.tng.type === 'live' &&
        <div className="tng-update-info-container">
          <div className="tng-update-time">Last updated: {props.tng.time}</div>
          <a href={props.tng.sourceUrl} target="_blank">
            <div className="tng-type-live">Live</div>
          </a>
        </div>
      }
      {props.tng.type === 'historical' &&
        <div className="tng-update-info-container">
          <a href={props.tng.sourceUrl} target="_blank">
            <div className="tng-type-historical">Historical data</div>
          </a>
        </div>
      }
    </div>
  );
};

TNGChart.propTypes = {
  tng: PropTypes.object
};

export default TNGChart;
