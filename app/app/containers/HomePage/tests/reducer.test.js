import { fromJS } from 'immutable';

import homeReducer from '../reducer';
import { changeSelectedElectricVehicle, changeSelectedIceVehicle } from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeSelectedElectricVehicle action correctly', () => {
    const vehicle = 'Tesla';
    const expectedResult = state.set('selectedElectricVehicle', vehicle);

    expect(homeReducer(state, changeSelectedElectricVehicle(vehicle))).toEqual(expectedResult);
  });

  it('should handle the changeSelectedIceVehicle action correctly', () => {
    const vehicle = 'Tesla';
    const expectedResult = state.set('selectedIceVehicle', vehicle);

    expect(homeReducer(state, changeSelectedIceVehicle(vehicle))).toEqual(expectedResult);
  });
});
