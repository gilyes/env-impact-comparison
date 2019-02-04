import React from 'react';
import { shallow } from 'enzyme';

import VehicleDetails from '../index';

describe('<VehicleDetails />', () => {
  it('should render vehicle image', () => {
    const renderedComponent = shallow(<VehicleDetails vehicle={{ name: 'vehicle name', pictureUrl: 'http://example.com/test.jpg'}} />);
    expect(renderedComponent.find('img [src="http://example.com/test.jpg"]')).toHaveLength(1);
  });

  it('should render carbon equivalent emitted', () => {
    const renderedComponent = shallow(<VehicleDetails vehicle={{ name: 'vehicle name'}} carbonEquivalentEmitted='99' />);
    const parent = renderedComponent.find('div [className="vehicle-emission"]');
    expect(parent.html().indexOf('<strong>99</strong> kg CO2e/100km')).not.toEqual(-1);
  });

  it('should render efficiency', () => {
    const renderedComponent = shallow(<VehicleDetails vehicle={{ name: 'vehicle name'}} efficiency='88' />);
    const parent = renderedComponent.find('div [className="vehicle-fuel"]');
    expect(parent.html().indexOf('<strong>88</strong> L/100km efficiency')).not.toEqual(-1);
  });

  it('should render ghg when specified', () => {
    const renderedComponent = shallow(<VehicleDetails vehicle={{ name: 'vehicle name'}} ghg='77' />);
    const parent = renderedComponent.find('div [className="vehicle-ghg"]');
    expect(parent.html().indexOf('<strong>77</strong> L/100km GHG')).not.toEqual(-1);
  });

  it('should not render ghg when not specified', () => {
    const renderedComponent = shallow(<VehicleDetails vehicle={{ name: 'vehicle name'}} />);
    const parent = renderedComponent.find('div [className="vehicle-ghg"]');
    expect(parent.html().indexOf('GHG')).toEqual(-1);
  });
});
