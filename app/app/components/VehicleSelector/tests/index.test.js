import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import VehicleSelector from '../index';

describe('<VehicleSelector />', () => {
  it('should render a Select', () => {
    const renderedComponent = shallow(<VehicleSelector />);
    expect(renderedComponent.find(Select)).toHaveLength(1);
  });
});
