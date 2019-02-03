import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import CostComparisonForm from '../../components/CostComparisonForm';
import TNGChart from '../../components/TNGChart';
import VehicleSelector from '../../components/VehicleSelector';
import AnnualCostChart from '../../components/AnnualCostChart';
import VehicleDetails from '../../components/VehicleDetails';
import VehicleCost from '../../components/VehicleCost';
import './style.scss';

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
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div className="home-page">
          <section>
            <div>
              <div className="tng-chart-container">
                <TNGChart tng={this.props.tng} />
              </div>
              <div className="vehicle-selectors">
                <VehicleSelector
                  vehicles={this.props.electricVehicles}
                  selectedVehicle={this.props.selectedElectricVehicle}
                  onSelectedVehicleChanged={this.props.onSelectedElectricVehicleChanged}
                  placeholder="Select EV..." />

                <VehicleSelector
                  vehicles={this.props.iceVehicles}
                  selectedVehicle={this.props.selectedIceVehicle}
                  onSelectedVehicleChanged={this.props.onSelectedIceVehicleChanged}
                  placeholder="Select ICE..." />

                {this.props.selectedElectricVehicle &&
                  <VehicleDetails
                    vehicle={this.props.selectedElectricVehicle}
                    carbonEquivalentEmitted={this.props.selectedElectricVehicleCarbonEquivalentEmitted}
                    efficiency={this.props.selectedElectricVehicleEfficiency}
                    ghg={this.props.selectedElectricVehicleGHG} />
                }

                {this.props.selectedIceVehicle &&
                  <VehicleDetails
                    vehicle={this.props.selectedIceVehicle}
                    carbonEquivalentEmitted={this.props.selectedIceVehicleCarbonEquivalentEmitted}
                    efficiency={this.props.selectedIceVehicleEfficiency} />
                }
                <div className="explanation-box-container">
                  {this.props.explanationText &&
                    <div className="explanation-box">
                      <ReactMarkdown source={this.props.explanationText} />
                    </div>
                  }
                </div>

                {(this.props.selectedElectricVehicle || this.props.selectedIceVehicle) &&
                  <div className="cost-comparison-container">
                    <CostComparisonForm initialValues={this.props.config.costComparisonDefaults} />
                  </div>
                }

                {(this.props.selectedElectricVehicle || this.props.selectedIceVehicle) &&
                  <div className="cost-comparison-result-container">
                    {this.props.selectedElectricVehicle &&
                      <VehicleCost vehicle={this.props.selectedElectricVehicle} annualCost={this.props.electricVehicleAnnualCost} />
                    }
                    {this.props.selectedIceVehicle &&
                      <VehicleCost vehicle={this.props.selectedIceVehicle} annualCost={this.props.iceVehicleAnnualCost} />
                    }
                  </div>
                }

                {(this.props.electricVehicleAnnualCost !== 'N/A' && this.props.iceVehicleAnnualCost != 'N/A') &&
                  <div className="annual-cost-chart-container">
                    <AnnualCostChart electricVehicleName={this.props.selectedElectricVehicle.name} iceVehicleName={this.props.selectedIceVehicle.name}
                      electricVehicleAnnualCost={this.props.electricVehicleAnnualCost} iceVehicleAnnualCost={this.props.iceVehicleAnnualCost} />
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
