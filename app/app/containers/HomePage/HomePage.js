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
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart)

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onInitialLoad();
  }

  render() {
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
                  <PieChart data={this.props.tng} donut={true} height="200px" legend="right" width="300px" />
                </div>
                <div id="vehicle-selectors">
                  <div className="vehicle-selector">
                    <Select
                      options={this.props.electricVehicles}
                      onChange={this.props.onSelectedElectricVehicleChanged}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                      isSearchable={false}
                      placeholder="Select EV..." />
                  </div>

                  <div className="vehicle-selector">
                    <Select
                      options={this.props.iceVehicles}
                      onChange={this.props.onSelectedIceVehicleChanged}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                      isSearchable={false}
                      placeholder="Select ICE..." />
                  </div>

                  {/* <div className="vehicle-results-container">
                    {(this.props.selectedElectricVehicle || this.props.selectedIceVehicle) &&
                      <div className="vehicle-headers">
                        <div className="vehicle-header"></div>
                        <div className="vehicle-header">Carbon Equivalent Emitted</div>
                        <div className="vehicle-header">Fuel Consumption</div>
                      </div>
                    } */}

                    {this.props.selectedElectricVehicle &&
                      <div className="vehicle-details">
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

                    {this.props.selectedIceVehicle &&
                      <div className="vehicle-details">
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
                  {/* </div> */}
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
  electricVehicles: PropTypes.array,
  iceVehicles: PropTypes.array,
  selectedElectricVehicle: PropTypes.object,
  selectedIceVehicle: PropTypes.object,
  onSelectedElectricVehicleChanged: PropTypes.func,
  onSelectedIceVehicleChanged: PropTypes.func
};
