/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { createTNGSelector, createConfigSelector, createElectricVehicleSelector, createIceVehicleSelector } from '../App/selectors';
import { formValueSelector } from 'redux-form/immutable';
import { toJS } from 'immutable';

const selectHome = (state) => state.get('home');

const createSelectedProvinceSelector = () => createSelector(
  selectHome,
  (state) => {
    const result = state.get('selectedProvince');
    return result ? result.toJS() : null;
  }
);

const createDefaultSelectedProvinceSelector = () => createSelector(
  createConfigSelector(),
  (config) => {
    if (!config || !config.provinces) {
      return null;
    }
    return config.provinces.find(x => x.name === config.defaultProvince.name);
  }
);

const createSelectedElectricVehicleSelector = () => createSelector(
  selectHome,
  (state) => {
    const result = state.get('selectedElectricVehicle')
    return result ? result.toJS() : null;
  }
);

const createSelectedIceVehicleSelector = () => createSelector(
  selectHome,
  (state) => {
    const result = state.get('selectedIceVehicle');
    return result ? result.toJS() : null;
  }
);

const createDefaultElectricVehicleSelector = () => createSelector(
  createElectricVehicleSelector(),
  createConfigSelector(),
  (vehicles, config) => {
    if (!vehicles || !config) {
      return null;
    }
    return vehicles.find(x => x.name === config.defaultElectricVehicle);
  }
);

const createDefaultIceVehicleSelector = () => createSelector(
  createIceVehicleSelector(),
  createConfigSelector(),
  (vehicles, config) => {
    if (!vehicles || !config) {
      return null;
    }
    return vehicles.find(x => x.name === config.defaultIceVehicle);
  }
);

const createExplanationTextSelector = () => createSelector(
  createConfigSelector(),
  (config) => {
    if (!config || !config.explanationText) {
      return null;
    }
    // insert spaces before line breaks so that they are properly converted by react-markdown
    config.explanationText = config.explanationText.replace(/\r\n/g, "\n").replace(/\n/g, "  \n");
    return config.explanationText;
  }
);

const createElectricVehicleCarbonEquivalentEmittedSelector = () => createSelector(
  createTNGSelector(),
  createSelectedElectricVehicleSelector(),
  (tng, vehicle) => {
    if (!vehicle || !vehicle.consumption || !tng) {
      return "N/A";
    }

    let coal = (tng.coal ? tng.coal : 0) / 100;
    let gas = (tng.gas ? tng.gas : 0) / 100;
    let hydro = (tng.hydro ? tng.hydro : 0) / 100;
    let wind = (tng.wind ? tng.wind : 0) / 100;
    let nuclear = (tng.nuclear ? tng.nuclear : 0) / 100;
    let solar = (tng.solar ? tng.solar : 0) / 100;
    let biomass = (tng.biomass ? tng.biomass : 0) / 100;
    let diesel = (tng.diesel ? tng.diesel : 0) / 100;
    let other = (tng.other ? tng.other : 0) / 100;

    //(USER DEFINED EV kWh/100km) X ([0.909kg/kWh X TNG COAL%] + [0.465kg/kWh X TNG GAS%] + [0.000kg/kWh X TNG HYDRO%] + [0.000kg/kWh X TNG WIND%] [1.5kg/kWh X TNG OTHER%])
    let result = vehicle.consumption * (
      0.909 * coal +
      0.465 * gas +
      0 * hydro +
      0 * wind +
      0 * nuclear +
      0 * solar +
      1.5 * biomass +
      0.25 * diesel +
      1.5 * other);
    return round(result, 2);
  }
);

const createElectricVehicleEfficiencySelector = () => createSelector(
  createSelectedElectricVehicleSelector(),
  (vehicle) => {
    if (!vehicle) {
      return "N/A";
    }

    // 235.21/(3370.5/1.609344/'kwh/100km'
    return round(235.21 / (3370.5 / 1.609344 / vehicle.consumption), 1);
  }
);

const createElectricVehicleGHGSelector = () => createSelector(
  createElectricVehicleCarbonEquivalentEmittedSelector(),
  (carbonEquivalentEmitted) => {
    if (carbonEquivalentEmitted === "N/A") {
      return "N/A";
    }

    return round(carbonEquivalentEmitted / 2.44, 1);
  }
);

const createIceVehicleCarbonEquivalentEmittedSelector = () => createSelector(
  createSelectedIceVehicleSelector(),
  (vehicle) => {
    if (!vehicle || !vehicle.consumption) {
      return "N/A";
    }

    return round(vehicle.consumption * 2.44, 1);
  }
);

const createIceVehicleEfficiencySelector = () => createSelector(
  createSelectedIceVehicleSelector(),
  (vehicle) => {
    if (!vehicle || !vehicle.consumption) {
      return "N/A";
    }

    return round(vehicle.consumption, 1);
  }
);

const selectCostComparisonForm = formValueSelector('costComparisonForm');

const selectAnnualDistanceDriven = (state) => selectCostComparisonForm(state, "annualDistanceDriven");

const selectFuelCost = (state) => selectCostComparisonForm(state, "fuelCost");

const selectElectricityRate = (state) => selectCostComparisonForm(state, "electricityRate");

const createElectricVehicleAnnualCostSelector = () => createSelector(
  selectAnnualDistanceDriven,
  selectElectricityRate,
  createSelectedElectricVehicleSelector(),
  (annualDistanceDriven, electricityRate, vehicle) => {
    if (!vehicle || isNaN(annualDistanceDriven) || isNaN(electricityRate) || annualDistanceDriven <= 0 || electricityRate <= 0) {
      return "N/A";
    }

    return round(vehicle.consumption * annualDistanceDriven * electricityRate / 10000.0, 0);
  }
);

const createIceVehicleAnnualCostSelector = () => createSelector(
  selectAnnualDistanceDriven,
  selectFuelCost,
  createSelectedIceVehicleSelector(),
  (annualDistanceDriven, fuelCost, vehicle) => {
    if (!vehicle || isNaN(annualDistanceDriven) || isNaN(fuelCost) || annualDistanceDriven <= 0 || fuelCost <= 0) {
      return "N/A";
    }

    return round(vehicle.consumption * annualDistanceDriven * fuelCost / 100.0, 0);
  }
);

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
}

export {
  selectHome,
  createSelectedProvinceSelector,
  createDefaultSelectedProvinceSelector,
  createSelectedElectricVehicleSelector,
  createSelectedIceVehicleSelector,
  createElectricVehicleCarbonEquivalentEmittedSelector,
  createElectricVehicleEfficiencySelector,
  createElectricVehicleGHGSelector,
  createIceVehicleCarbonEquivalentEmittedSelector,
  createIceVehicleEfficiencySelector,
  selectAnnualDistanceDriven,
  selectFuelCost,
  selectElectricityRate,
  createElectricVehicleAnnualCostSelector,
  createIceVehicleAnnualCostSelector,
  createDefaultElectricVehicleSelector,
  createDefaultIceVehicleSelector,
  createExplanationTextSelector
};
