import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './style.scss'

const ProvinceSelector = (props) => {
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
    <div className="province-selector">
      <Select
        options={props.provinces}
        styles={selectStyles}
        onChange={props.onSelectedProvinceChanged}
        value={props.selectedProvince}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        isSearchable={false}
        noOptionsMessage={() => props.error ? "Load error." : "Loading..."}
        placeholder={props.placeholder} />
    </div>
  )
};

ProvinceSelector.propTypes = {
  provinces: PropTypes.array,
  onSelectedProvinceChanged: PropTypes.func,
  selectedProvince: PropTypes.object,
  placeholder: PropTypes.string
};

export default ProvinceSelector;
