import React from 'react';
import { shallow } from 'enzyme';

import TNGChart from '../index';
import { PieChart } from 'react-chartkick';

describe('<TNGChart />', () => {
  it('should render a PieChart', () => {
    const renderedComponent = shallow(<TNGChart />);
    expect(renderedComponent.find(PieChart).length).toBe(1);
  });
});
