import React from 'react';
import App from './App';
import { mount, shallow } from 'enzyme';

it('App do not render with wrong gallery structure function call', () => {
  jest.mock('./Components/GalleryStructure', () => () => ({
    calculateGalleryStructureParams: jest.fn().mockImplementation(() => null)
  }));

  const component = shallow(<App />);
console.log('111');
  expect(component.type()).toBeNull();

  jest.unmock('./Components/GalleryStructure');
});

it('App renders with normal gallery structure function call', () => {
  const component = shallow(<App />);
  console.log('111');
  expect(component.type()).not.toBeNull();
});