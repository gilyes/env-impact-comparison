/**
 * Test the HomePage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import HomePage from '../HomePage';
import { mapDispatchToProps } from '../index';
import { changeSelectedElectricVehicle, changeSelectedIceVehicle } from '../actions';

describe('<HomePage />', () => {

  describe('mapDispatchToProps', () => {
    describe('onSelectedElectricVehicleChanged', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSelectedElectricVehicleChanged).toBeDefined();
      });

      it('should dispatch changeSelectedElectricVehicle when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const vehicle = 'vehicle';
        result.onSelectedElectricVehicleChanged(vehicle);
        expect(dispatch).toHaveBeenCalledWith(changeSelectedElectricVehicle(vehicle));
      });
    });

    describe('onSelectedIceVehicleChanged', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSelectedIceVehicleChanged).toBeDefined();
      });

      it('should dispatch changeSelectedIceVehicle when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const vehicle = 'vehicle';
        result.onSelectedIceVehicleChanged(vehicle);
        expect(dispatch).toHaveBeenCalledWith(changeSelectedIceVehicle(vehicle));
      });
    });
  });
});
