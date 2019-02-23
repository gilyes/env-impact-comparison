/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const createLoadingSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const createErrorSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const createElectricVehicleSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['data', 'electricVehicles'])
);

const createIceVehicleSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['data', 'iceVehicles'])
);

const createTNGSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['data', 'tng'])
);

const createConfigSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['data', 'config'])
);

const createTNGForDisplaySelector = () => createSelector(
  createTNGSelector(),
  (tng) => {
    if (!tng) {
      return {};
    }

    const tngForDisplay = { "Coal": tng.coal, "Gas": tng.gas, "Hydro": tng.hydro, "Wind": tng.wind, "Solar/Other": tng.other };
    return tngForDisplay;
  }
);

export {
  selectGlobal,
  createLoadingSelector,
  createErrorSelector,
  createElectricVehicleSelector,
  createIceVehicleSelector,
  createTNGSelector,
  createTNGForDisplaySelector,
  createConfigSelector
};
