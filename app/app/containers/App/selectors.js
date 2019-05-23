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

const createProvincesSelector = () => createSelector(
  createConfigSelector(),
  (config) => config ? config.provinces : []
);

const createTNGForDisplaySelector = () => createSelector(
  createTNGSelector(),
  (tng) => {
    if (!tng) {
      return {};
    }

    const tngForDisplay = {
      tng: {
        "Coal": tng.coal,
        "Gas": tng.gas,
        "Nuclear": tng.nuclear,
        "Hydro": tng.hydro,
        "Wind": tng.wind,
        "Solar": tng.solar,
        "Biomass": tng.biomass,
        "Diesel": tng.diesel,
        // if there is explicit Solar entry then skip Solar/Other
        "Solar/Other": tng.solar ? 0 : tng.other,
        // if there is explicit Solar entry then add explicit Other (if present)
        "Other": tng.solar ? tng.other : 0
      },
      time: tng.time
    };

    return tngForDisplay;
  }
);

export {
  selectGlobal,
  selectRoute,
  createLoadingSelector,
  createErrorSelector,
  createElectricVehicleSelector,
  createIceVehicleSelector,
  createTNGSelector,
  createTNGForDisplaySelector,
  createConfigSelector,
  createProvincesSelector
};
