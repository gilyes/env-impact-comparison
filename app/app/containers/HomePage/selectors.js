/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { createTNGSelector, createConfigSelector, createElectricVehicleSelector, createIceVehicleSelector } from '../App/selectors';
import { formValueSelector } from 'redux-form/immutable';
import { toJS } from 'immutable';

const selectHome = (state) => state.get('home');

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

const createElectricVehicleCarbonEquivalentEmittedSelector = () => createSelector(
  createTNGSelector(),
  createSelectedElectricVehicleSelector(),
  (tng, vehicle) => {
    if (!vehicle || !vehicle.consumption || !tng || !tng.coal || !tng.gas || !tng.hydro || !tng.wind || !tng.other || !tng.total) {
      return "N/A";
    }

    let coalPercentage = tng.coal / tng.total;
    let gasPercentage = tng.gas / tng.total;
    let hydroPercentage =tng.hydro / tng.total;
    let windPercentage = tng.wind / tng.total;
    let otherPercentage = tng.other / tng.total;

    //(USER DEFINED EV kWh/100km) X ([0.909kg/kWh X TNG COAL%] + [0.465kg/kWh X TNG GAS%] + [0.000kg/kWh X TNG HYDRO%] + [0.000kg/kWh X TNG WIND%] [1.5kg/kWh X TNG OTHER%])
    let result = vehicle.consumption * (0.909 * coalPercentage + 0.465 * gasPercentage + 0 * hydroPercentage + 0 * windPercentage + 1.5 * otherPercentage);
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
  createDefaultIceVehicleSelector
};
