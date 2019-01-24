/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import './style.scss';
import { PieChart } from 'react-chartkick';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onInitialLoad();
    this.timer = setInterval(this._tick, 90000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _tick = () => {
    this.props.onReloadTNGRequested();
  }

  render() {
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
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div className="home-page">
          <section>
            <form>
              <div>
                <div id="tng-chart-container">
                  <PieChart data={this.props.tng} donut={true} legend="right" library={{
                    backgroundColor: "transparent",
                    fontSize: "14",
                    legend: { textStyle: { color: '#eeeeee', fontSize: "16" } },
                    chartArea: { top: 9, bottom: 9, left: 5, right: 5},
                    tooltip: { text: 'percentage', showColorCode: true }
                  }} />
                </div>
                <div id="vehicle-selectors">
                  <div className="vehicle-selector">
                    <Select
                      options={this.props.electricVehicles}
                      styles={selectStyles}
                      onChange={this.props.onSelectedElectricVehicleChanged}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                      isSearchable={false}
                      noOptionsMessage={() => this.props.error ? "Load error." : "Loading..."}
                      placeholder="Select EV..." />
                  </div>

                  <div className="vehicle-selector">
                    <Select
                      options={this.props.iceVehicles}
                      styles={selectStyles}
                      onChange={this.props.onSelectedIceVehicleChanged}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                      isSearchable={false}
                      noOptionsMessage={() => this.props.error ? "Load error." : "Loading..."}
                      placeholder="Select ICE..." />
                  </div>

                  <div className="vehicle-details">
                    {this.props.selectedElectricVehicle &&
                      <div>
                        <div className="vehicle-image-container">
                          <img src={this.props.selectedElectricVehicle.pictureUrl} alt={this.props.selectedElectricVehicle.name} className="vehicle-image" />
                        </div>
                        <div className="vehicle-emission">
                          <strong>{this.props.selectedElectricVehicleCarbonEquivalentEmitted}</strong> kg CO2e/100km
                        </div>
                        <div className="vehicle-fuel">
                          <strong>{this.props.selectedElectricVehicleFuelConsumption}</strong> L/100km equivalent
                        </div>
                      </div>
                    }
                  </div>

                  <div className="vehicle-details">
                    {this.props.selectedIceVehicle &&
                      <div>
                        <div className="vehicle-image-container">
                          <img src={this.props.selectedIceVehicle.pictureUrl} alt={this.props.selectedIceVehicle.name} className="vehicle-image" />
                        </div>
                        <div className="vehicle-emission">
                          <strong>{this.props.selectedIceVehicleCarbonEquivalentEmitted}</strong> kg CO2e/100km
                        </div>
                        <div className="vehicle-fuel">
                          <strong>{this.props.selectedIceVehicleFuelConsumption}</strong> L/100km
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onInitialLoad: PropTypes.func,
  onReloadTNGRequested: PropTypes.func,
  electricVehicles: PropTypes.array,
  iceVehicles: PropTypes.array,
  selectedElectricVehicle: PropTypes.object,
  selectedIceVehicle: PropTypes.object,
  onSelectedElectricVehicleChanged: PropTypes.func,
  onSelectedIceVehicleChanged: PropTypes.func
};
