/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { getElectricVehicles, electricVehiclesSaga, getIceVehicles, iceVehiclesSaga } from '../saga';
import { electricVehiclesLoaded, electricVehiclesLoadError, iceVehiclesLoaded, iceVehiclesLoadError } from 'containers/App/actions';
import { LOAD_ELECTRIC_VEHICLES, LOAD_ICE_VEHICLES } from 'containers/App/constants';

/* eslint-disable redux-saga/yield-effects */
describe('getElectricVehicles Saga', () => {
  let getElectricVehiclesGenerator;

  beforeEach(() => {
    getElectricVehiclesGenerator = getElectricVehicles();
  });

  it('should dispatch the electricVehiclesLoaded action if it requests the data successfully', () => {
    getElectricVehiclesGenerator.next();

    const response = [{ value: 'First vehicle', }, { value: 'Second vehicle' }];
    const putDescriptor = getElectricVehiclesGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(electricVehiclesLoaded(response)));
  });

  it('should call the electricVehiclesLoadError action if the response errors', () => {
    getElectricVehiclesGenerator.next();

    const response = new Error('Some error');
    const putDescriptor = getElectricVehiclesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(electricVehiclesLoadError(response)));
  });
});

describe('getElectricVehicles Saga', () => {
  const saga = electricVehiclesSaga();

  it('should start task to watch for LOAD_ELECTRIC_VEHICLES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ELECTRIC_VEHICLES, getElectricVehicles));
  });
});

describe('getIceVehicles Saga', () => {
  let getIceVehiclesGenerator;

  beforeEach(() => {
    getIceVehiclesGenerator = getIceVehicles();
  });

  it('should dispatch the iceVehiclesLoaded action if it requests the data successfully', () => {
    getIceVehiclesGenerator.next();

    const response = [{ value: 'First vehicle', }, { value: 'Second vehicle' }];
    const putDescriptor = getIceVehiclesGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(iceVehiclesLoaded(response)));
  });

  it('should call the iceVehiclesLoadError action if the response errors', () => {
    getIceVehiclesGenerator.next();

    const response = new Error('Some error');
    const putDescriptor = getIceVehiclesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(iceVehiclesLoadError(response)));
  });
});

describe('getIceVehicles Saga', () => {
  const saga = iceVehiclesSaga();

  it('should start task to watch for LOAD_ICE_VEHICLES action', () => {
    const takeLatestDescriptor = saga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ICE_VEHICLES, getIceVehicles));
  });
});

