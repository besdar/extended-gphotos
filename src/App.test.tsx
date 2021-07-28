import React from 'react';
import App from './App';
import { mount } from 'enzyme';

it('App do not render with wrong gallery structure function call', () => {
  jest.mock('./Components/GalleryStructure.ts', () => ({ calculateGalleryStructureParams: () => null }));
  const component = mount(<App />);

  expect(component).toMatchObject({});
});