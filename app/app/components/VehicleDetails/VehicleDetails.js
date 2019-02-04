import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

const VehicleDetails = (props) => {
  return (
    <div className="vehicle-details">
      <div>
        <div className="vehicle-image-container">
          <img src={props.vehicle.pictureUrl} alt={props.vehicle.name} className="vehicle-image" />
        </div>
        <div className="vehicle-emission">
          <strong>{props.carbonEquivalentEmitted}</strong> kg CO2e/100km
        </div>
        <div className="vehicle-fuel">
          <strong>{props.efficiency}</strong> L/100km efficiency
        </div>
        <div className="vehicle-ghg">
          {props.ghg &&
            <div>
              <strong>{props.ghg}</strong> L/100km GHG
            </div>
          }
          {!props.ghg &&
            <div>
              <strong>&nbsp;</strong>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

VehicleDetails.propTypes = {
  vehicle: PropTypes.object,
  carbonEquivalentEmitted: PropTypes.string,
  efficiency: PropTypes.string,
  ghg: PropTypes.string
};

export default VehicleDetails;
