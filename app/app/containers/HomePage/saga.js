import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  electricVehiclesLoaded, electricVehiclesLoadError, iceVehiclesLoaded, iceVehiclesLoadError, tngLoaded, tngLoadError,
  configLoaded, configLoadError
} from 'containers/App/actions';

import request from 'utils/request';
import { LOAD_ELECTRIC_VEHICLES, LOAD_ICE_VEHICLES, LOAD_TNG, LOAD_CONFIG } from '../App/constants';
import { setDefaultSelectedElectricVehicle, setDefaultSelectedIceVehicle } from './actions';

export function* getElectricVehicles() {
  try {
    const vehicles = yield call(request, getApiUrl("wp-json/env-impact-comparison/v1/electricVehicles"));

    yield put(electricVehiclesLoaded(vehicles));
  } catch (err) {
    yield put(electricVehiclesLoadError(err));
  }
}

export function* getIceVehicles() {
  try {
    const vehicles = yield call(request, getApiUrl("wp-json/env-impact-comparison/v1/iceVehicles"));

    yield put(iceVehiclesLoaded(vehicles));
  } catch (err) {
    yield put(iceVehiclesLoadError(err));
  }
}

export function* getTNG() {
  try {
    const tng = yield call(request, getApiUrl("wp-json/env-impact-comparison/v1/tng"));

    yield put(tngLoaded(tng));
  } catch (err) {
    yield put(tngLoadError(err));
  }
}

export function* getConfig() {
  try {
    const config = yield call(request, getApiUrl("wp-json/env-impact-comparison/v1/config"));

    yield all([
      put(configLoaded(config)),
      put(setDefaultSelectedElectricVehicle(config.defaultElectricVehicle)),
      put(setDefaultSelectedIceVehicle(config.defaultIceVehicle))
    ]);
  } catch (err) {
    yield put(configLoadError(err));
  }
}

function getApiUrl(relativePath) {
  var rootUrl = process.env.API_ROOT_URL;
  if (rootUrl) {
    return rootUrl + relativePath;
  }
  else {
    return window.origin + "/" + relativePath;
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* electricVehiclesSaga() {
  // Watches for actions and calls getXXX when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_ELECTRIC_VEHICLES, getElectricVehicles);
}

export function* iceVehiclesSaga() {
  yield takeLatest(LOAD_ICE_VEHICLES, getIceVehicles);
}

export function* tngSaga() {
  yield takeLatest(LOAD_TNG, getTNG);
}

export function* configSaga() {
  yield takeLatest(LOAD_CONFIG, getConfig);
}

