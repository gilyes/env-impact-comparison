import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import ProvinceSelector from '../index';

describe('<ProvinceSelector />', () => {
  it('should render a Select', () => {
    const renderedComponent = shallow(<ProvinceSelector />);
    expect(renderedComponent.find(Select)).toHaveLength(1);
  });
});
