import { calculateGalleryStructureParams, getGalleryStructureData } from './GalleryStructure';

describe('Tests for calculateGalleryStructureParams function', () => {
  it('Returns null on wrong values', () => {
    expect(calculateGalleryStructureParams(0, 0, 1, 2)).toBeNull();
    expect(calculateGalleryStructureParams(100, 100, 0, 1)).toBeNull();
    expect(calculateGalleryStructureParams(100, 0, 1, 2)).toBeNull();
  });

  it('Returns object on normal values', () => {
    expect(calculateGalleryStructureParams(100, 100, 1, 2)).not.toBeNull();
  });
});

describe('Tests for getGalleryStructureData function', () => {
  it('Returns empty array on wrong values', () => {
    expect(getGalleryStructureData({
      columnsCount: 0,
      maxSquareSizeInColumns: 0,
      rowsCount: 0,
    })).toHaveLength(0);
  });

  it('Returns filled array on normal values', () => {
    expect(getGalleryStructureData({
      columnsCount: 2,
      maxSquareSizeInColumns: 2,
      rowsCount: 2,
    })).not.toHaveLength(0);
  });
});
