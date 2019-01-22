/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { createTNGSelector } from '../App/selectors';

const selectHome = (state) => state.get('home');

const createSelectedElectricVehicleSelector = () => createSelector(
  selectHome,
  (homeState) => homeState.get('selectedElectricVehicle')
);

const createSelectedIceVehicleSelector = () => createSelector(
  selectHome,
  (homeState) => homeState.get('selectedIceVehicle')
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
    let hydroPercentage = tng.hydro / tng.total;
    let windPercentage = tng.wind / tng.total;
    let otherPercentage = tng.other / tng.total;

    //(USER DEFINED EV kWh/100km) X ([0.909kg/kWh X TNG COAL%] + [0.465kg/kWh X TNG GAS%] + [0.000kg/kWh X TNG HYDRO%] + [0.000kg/kWh X TNG WIND%] [1.5kg/kWh X TNG OTHER%])
    let result = vehicle.consumption * (0.909 * coalPercentage + 0.465 * gasPercentage + 0 * hydroPercentage + 0 * windPercentage + 1.5 * otherPercentage);
    return round(result, 2);
  }
);

const createElectricVehicleFuelConsumptionSelector = () => createSelector(
  createSelectedElectricVehicleSelector(),
  (vehicle) => {
    if (!vehicle || !vehicle.consumption) {
      return "N/A";
    }

    return round(vehicle.consumption / 2.44, 1);
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

const createIceVehicleFuelConsumptionSelector = () => createSelector(
  createSelectedIceVehicleSelector(),
  (vehicle) => {
    if (!vehicle || !vehicle.consumption) {
      return "N/A";
    }

    return round(vehicle.consumption, 1);
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
  createElectricVehicleFuelConsumptionSelector,
  createIceVehicleCarbonEquivalentEmittedSelector,
  createIceVehicleFuelConsumptionSelector
};
