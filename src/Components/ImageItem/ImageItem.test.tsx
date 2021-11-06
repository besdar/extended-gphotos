import React from 'react';
import { shallow } from 'enzyme';
import ImageItem from './ImageItem';

jest.useFakeTimers();

it('Correct render', () => {
  const component = shallow(<ImageItem
    anotherImageUrl="anotherImg"
    isFirstImageActive
    imageUrl="firstImg"
    tooltipTitle="tooltip"
    squareCoordinates={{
      ystart: 1,
      xend: 2,
      xstart: 3,
      yend: 4,
    }}
    webUrl="weburl"
  />);

  jest.runAllTimers();

  expect(component).toMatchSnapshot();

  component.setProps({ isFirstImageActive: false });
  jest.runAllTimers();

  expect(component).toMatchSnapshot();
});
