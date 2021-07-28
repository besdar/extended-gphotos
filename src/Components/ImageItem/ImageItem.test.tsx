import React from 'react';
import { mount } from 'enzyme';
import ImageItem from './ImageItem';

jest.useFakeTimers();

it('Correct render', () => {
  const component = mount(<ImageItem
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

  expect(component).toMatchSnapshot();

  component.setProps({ isFirstImageActive: false });

  expect(component).toMatchSnapshot();
});