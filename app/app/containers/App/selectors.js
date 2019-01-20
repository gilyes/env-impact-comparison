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
  (globalState) => globalState.getIn(['userData', 'electricVehicles'])
);

const createIceVehicleSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'iceVehicles'])
);

const createTNGSelector = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'tng'])
);

export {
  selectGlobal,
  createLoadingSelector,
  createErrorSelector,
  createElectricVehicleSelector,
  createIceVehicleSelector,
  createTNGSelector
};
