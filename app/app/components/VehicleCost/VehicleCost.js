import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

const VehicleCost = (props) => {
  return (
    <div className="vehicle-details-cost">
      <div>
        <div className="vehicle-annual-cost">
          {props.vehicle.name}<br />
          Annual cost: $<strong>{props.annualCost}</strong>
        </div>
      </div>
    </div>
  )
};

VehicleCost.propTypes = {
  vehicle: PropTypes.object,
  annualCost: PropTypes.string,
};

export default VehicleCost;
