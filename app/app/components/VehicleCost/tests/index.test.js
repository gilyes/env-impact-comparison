import React from 'react';
import { shallow } from 'enzyme';

import VehicleCost from '../index';

describe('<VehicleCost />', () => {
  it('should render vehicle name', () => {
    const renderedComponent = shallow(<VehicleCost vehicle={{ name: 'vehicle name' }} />);
    expect(renderedComponent.contains('vehicle name')).toBe(true);
  });
});
