import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { calculateGalleryStructureParams } from './Components/GalleryStructure';

jest.mock('./Components/GalleryStructure', () => ({
  calculateGalleryStructureParams: jest.fn()
}));

const calculateGalleryStructureParamsMock = calculateGalleryStructureParams as jest.MockedFunction<typeof calculateGalleryStructureParams>;

describe('Check App render with various helper function returns', () => {
  beforeEach(() => {
    calculateGalleryStructureParamsMock.mockReset();
  });
  
  it('App do not render with wrong gallery structure function call', () => {
    calculateGalleryStructureParamsMock.mockReturnValueOnce(null);
    const component = shallow(<App />);
  
    expect(component.isEmptyRender()).toBeTruthy();
  
    jest.unmock('./Components/GalleryStructure');
  });
  
  it('App renders with normal gallery structure function call', () => {
    calculateGalleryStructureParamsMock.mockReturnValueOnce({
      columnsCount: 2,
      maxSquareSizeInColumns: 2,
      rowsCount: 2,
    });
  
    const component = shallow(<App />);
  
    expect(component).toMatchSnapshot();
  });
});

describe('Tests with window resize', () => {
  const originalWindowInnerWidth = window.innerWidth;

  beforeAll(() => {
    calculateGalleryStructureParamsMock.mockRestore();
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: originalWindowInnerWidth,
    });
  });

  it('Small screen case', () => {
    calculateGalleryStructureParamsMock.mockRestore();
    Object.defineProperty(window, 'innerWidth', {
      value: 599,
    });

    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });

  it('Big screen case', () => {
    calculateGalleryStructureParamsMock.mockRestore();
    Object.defineProperty(window, 'innerWidth', {
      value: 601,
    });

    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
})
