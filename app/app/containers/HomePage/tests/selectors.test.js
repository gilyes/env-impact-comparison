import { fromJS } from 'immutable';

import {
  selectHome,
  createSelectedElectricVehicleSelector,
  createSelectedIceVehicleSelector
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('createSelectedElectricVehicleSelector', () => {
  const selector = createSelectedElectricVehicleSelector();
  it('should select the selected vehicle', () => {
    const selectedElectricVehicle = 'vehicle';
    const mockedState = fromJS({
      home: {
        selectedElectricVehicle,
      },
    });
    expect(selector(mockedState)).toEqual(selectedElectricVehicle);
  });
});

describe('createSelectedIceVehicleSelector', () => {
  const selector = createSelectedIceVehicleSelector();
  it('should select the selected vehicle', () => {
    const selectedIceVehicle = 'vehicle';
    const mockedState = fromJS({
      home: {
        selectedIceVehicle,
      },
    });
    expect(selector(mockedState)).toEqual(selectedIceVehicle);
  });
});
