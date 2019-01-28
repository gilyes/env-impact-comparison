import { fromJS } from 'immutable';

import {
  selectHome,
  createSelectedElectricVehicleSelector,
  createSelectedIceVehicleSelector,
  createElectricVehicleAnnualCostSelector,
  createIceVehicleAnnualCostSelector
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      data: {},
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
    const selectedElectricVehicle = { name: "vehicle" };
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
    const selectedIceVehicle = { name: "vehicle" };
    const mockedState = fromJS({
      home: {
        selectedIceVehicle,
      },
    });
    expect(selector(mockedState)).toEqual(selectedIceVehicle);
  });
});

describe('createElectricVehicleAnnualCostSelector', () => {
  const selector = createElectricVehicleAnnualCostSelector();
  it('should correctly calculate cost when all inputs available', () => {
    const selectedElectricVehicle = { consumption: "25" };
    const mockedState = fromJS({
      form: {
        costComparisonForm: {
          values: {
            annualDistanceDriven: '1000',
            electricityRate: '5'
          }
        }
      },
      home: {
        selectedElectricVehicle
      },
    });
    expect(selector(mockedState)).toEqual("13");
  });

  it('should return N/A when not all inputs available', () => {
    const selectedElectricVehicle = { consumption: "25" };
    const mockedState = fromJS({
      form: {
        costComparisonForm: {
          values: {
            annualDistanceDriven: '1000'
          }
        }
      },
      home: {
        selectedElectricVehicle
      },
    });
    expect(selector(mockedState)).toEqual("N/A");
  });
});

describe('createIceVehicleAnnualCostSelector', () => {
  const selector = createIceVehicleAnnualCostSelector();
  it('should correctly calculate cost when all inputs available', () => {
    const selectedIceVehicle = { consumption: "10" };
    const mockedState = fromJS({
      form: {
        costComparisonForm: {
          values: {
            annualDistanceDriven: '1000',
            fuelCost: '2'
          }
        }
      },
      home: {
        selectedIceVehicle
      },
    });
    expect(selector(mockedState)).toEqual("200");
  });

  it('should return N/A when not all inputs available', () => {
    const selectedIceVehicle = { consumption: "10" };
    const mockedState = fromJS({
      form: {
        costComparisonForm: {
          values: {
            annualDistanceDriven: '1000',
          }
        }
      },
      home: {
        selectedIceVehicle
      },
    });
    expect(selector(mockedState)).toEqual("N/A");
  });
});
