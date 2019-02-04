import React from 'react';
import { shallow } from 'enzyme';

import AnnualCostChart from '../index';
import { ColumnChart } from 'react-chartkick';

describe('<AnnualCostChart />', () => {
  it('should render a ColumnChart', () => {
    const renderedComponent = shallow(<AnnualCostChart />);
    expect(renderedComponent.find(ColumnChart).length).toBe(1);
  });
});
