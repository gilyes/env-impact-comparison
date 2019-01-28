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
import { PieChart, ColumnChart } from 'react-chartkick';
import CostComparisonForm from '../../components/CostComparisonForm';

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

  handleTextInputChange(event) {
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
            <div>
              <div id="tng-chart-container">
                <PieChart data={this.props.tng} donut={true} legend="right" library={{
                  backgroundColor: "transparent",
                  fontSize: "14",
                  pieHole: 0.45,
                  legend: { textStyle: { color: '#eeeeee', fontSize: "15" } },
                  chartArea: { top: 9, bottom: 9, left: 5, right: 5 },
                  tooltip: { text: 'percentage', showColorCode: true }
                }} />
              </div>
              <div className="vehicle-selectors">
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
                        <strong>{this.props.selectedElectricVehicleEfficiency}</strong> L/100km efficiency
                      </div>
                      <div className="vehicle-fuel">
                        <strong>{this.props.selectedElectricVehicleGHG}</strong> L/100km GHG
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
                        <strong>{this.props.selectedIceVehicleEfficiency}</strong> L/100km efficiency
                      </div>
                      <div className="vehicle-fuel">
                        &nbsp;
                      </div>
                    </div>
                  }
                </div>

                {(this.props.selectedElectricVehicle || this.props.selectedIceVehicle) &&
                  <div className="cost-comparison-container">
                    <CostComparisonForm />
                  </div>
                }

                {(this.props.selectedElectricVehicle || this.props.selectedIceVehicle) &&
                  <div className="cost-comparison-result-container">
                    <div className="vehicle-details">
                      {this.props.selectedElectricVehicle &&
                        <div>
                          <div className="vehicle-annual-cost">
                            {this.props.selectedElectricVehicle.name}<br />
                            Annual cost: $<strong>{this.props.electricVehicleAnnualCost}</strong>
                          </div>
                        </div>
                      }
                    </div>
                    <div className="vehicle-details">
                      {this.props.selectedIceVehicle &&
                        <div>
                          <div className="vehicle-annual-cost">
                            {this.props.selectedIceVehicle.name}<br />
                            Annual cost: $<strong>{this.props.iceVehicleAnnualCost}</strong>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }

                {(this.props.electricVehicleAnnualCost !== 'N/A' && this.props.iceVehicleAnnualCost != 'N/A') &&
                  <div id="annual-cost-chart-container">
                    <ColumnChart
                      data={[
                        { name: 'Estimated Annual Cost', data: [[this.props.selectedElectricVehicle.name, this.props.electricVehicleAnnualCost]] },
                        { name: 'Estimated Annual Cost', data: [[this.props.selectedIceVehicle.name, this.props.iceVehicleAnnualCost]] }
                      ]}
                      legend="none"
                      library={{
                        backgroundColor: "#202020",
                        fontSize: "14",
                        colors: ['#00FF00', '#FF0000'],
                      }} />
                  </div>
                }
              </div>
            </div>
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
  onSelectedIceVehicleChanged: PropTypes.func,
  annualDistanceDriven: PropTypes.string,
  fuelCost: PropTypes.string,
  electricityRate: PropTypes.string,
  electricVehicleAnnualCost: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  iceVehicleAnnualCost: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};
