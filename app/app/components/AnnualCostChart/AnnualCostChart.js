import React from 'react';
import PropTypes from 'prop-types';
import { ColumnChart } from 'react-chartkick';

const AnnualCostChart = (props) => {
  return (
    <ColumnChart
      data={[
        { name: 'Estimated Annual Cost', data: [[props.electricVehicleName, props.electricVehicleAnnualCost]] },
        { name: 'Estimated Annual Cost', data: [[props.iceVehicleName, props.iceVehicleAnnualCost]] }
      ]}
      legend="none"
      library={{
        backgroundColor: "#202020",
        fontSize: "14",
        colors: ['#00FF00', '#FF0000'],
      }} />
  );
};

AnnualCostChart.propTypes = {
  electricVehicleName: PropTypes.string,
  iceVehicleName: PropTypes.string,
  electricVehicleAnnualCost: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  iceVehicleAnnualCost: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};

export default AnnualCostChart;
