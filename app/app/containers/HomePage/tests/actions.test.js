import { CHANGE_SELECTED_ELECTRIC_VEHICLE, CHANGE_SELECTED_ICE_VEHICLE } from '../constants';

import { changeSelectedElectricVehicle, changeSelectedIceVehicle } from '../actions';

describe('Home Actions', () => {
  describe('changeSelectedElectricVehicle', () => {
    it('should return the correct type and the passed name', () => {
      const vehicle = 'Tesla';
      const expectedResult = {
        type: CHANGE_SELECTED_ELECTRIC_VEHICLE,
        vehicle: vehicle
      };

      expect(changeSelectedElectricVehicle(vehicle)).toEqual(expectedResult);
    });
  });

  describe('changeSelectedIceVehicle', () => {
    it('should return the correct type and the passed name', () => {
      const vehicle = 'Trabant';
      const expectedResult = {
        type: CHANGE_SELECTED_ICE_VEHICLE,
        vehicle: vehicle
      };

      expect(changeSelectedIceVehicle(vehicle)).toEqual(expectedResult);
    });
  });
});
