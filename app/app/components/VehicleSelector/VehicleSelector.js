import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './style.scss'

const VehicleSelector = (props) => {
  const selectStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: '#1c1c1c',
    }),
    option: (styles, state) => {
      return {
        ...styles,
        backgroundColor: state.isFocused ? '#4c4c4c' : '#3c3c3c',
        color: '#c0c0c0',
        ':active': {
          backgroundColor: '#5c5c5c'
        }
      };
    },
    singleValue: (provided, state) => {
      const color = '#c0c0c0';
      return { ...provided, color };
    },
    menu: base => ({
      ...base,
      borderRadius: 0,
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      padding: 0
    })
  };
  return (
    <div className="vehicle-selector">
      <Select
        options={props.vehicles}
        styles={selectStyles}
        onChange={props.onSelectedVehicleChanged}
        value={props.selectedVehicle}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        isSearchable={false}
        noOptionsMessage={() => props.error ? "Load error." : "Loading..."}
        placeholder={props.placeholder} />
    </div>
  )
};

VehicleSelector.propTypes = {
  vehicles: PropTypes.array,
  onSelectedVehicleChanged: PropTypes.func,
  selectedVehicle: PropTypes.object,
  placeholder: PropTypes.string
};

export default VehicleSelector;
