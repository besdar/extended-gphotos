const isSquareFit = (
  squaresMap: number[][],
  currentRow: number,
  currentColumn: number,
  elementarySquareSideCount: number,
) => {
  for (let i = currentRow; i < currentRow + elementarySquareSideCount; i += 1) {
    for (let j = currentColumn; j < currentColumn + elementarySquareSideCount; j += 1) {
      try {
        if (squaresMap[i][j] !== 0) {
          return false;
        }
      } catch {
        return false;
      }
    }
  }

  return true;
};

const getRandomSquareSide = (timesNumberMaxSideGreaterThanMinSide: number): number => {
  if (timesNumberMaxSideGreaterThanMinSide === 0) {
    return 1;
  }

  return Math.round(Math.random()) + getRandomSquareSide(timesNumberMaxSideGreaterThanMinSide - 1);
};

export const calculateGalleryStructureParams = (
  height: number,
  width: number,
  minSquareSide: number,
  maxSqureSide: number,
): galleryStructureParamsType | null => {
  if (minSquareSide <= 0) {
    return null;
  }

  const rowLength = Math.floor(width / minSquareSide);
  const maxSquareSizeInColumns = Math.floor(maxSqureSide / minSquareSide);

  if (rowLength <= 0 || maxSquareSizeInColumns <= 1) {
    return null;
  }

  const rowsCount = Math.floor(height / minSquareSide);

  return {
    columnsCount: rowLength,
    rowsCount,
    maxSquareSizeInColumns,
  };
};

const generateSquaresMap = (
  rowsCount: number,
  columnsCount: number,
) => {
  const squaresMap = [] as number[][];

  for (let i = 0; i < rowsCount; i += 1) {
    squaresMap.push(new Array(columnsCount).fill(0));
  }

  return squaresMap;
};

export type SquareType = {
  xstart: number,
  xend: number,
  ystart: number,
  yend: number,
}

export type galleryStructureParamsType = {
  rowsCount: number,
  columnsCount: number,
  maxSquareSizeInColumns: number,
};
export const getGalleryStructureData = ({
  rowsCount,
  columnsCount,
  maxSquareSizeInColumns,
}: galleryStructureParamsType) => {
  const result = [] as SquareType[];

  if (rowsCount <= 0) {
    return result;
  }

  const squaresMap = generateSquaresMap(rowsCount, columnsCount);
  let currentRow = 0;
  let currentColumn = 0;
  let mapNumber = 1;

  while ((currentColumn !== columnsCount && currentColumn !== -1) || currentRow !== rowsCount - 1) {
    const sideInElementarySquares = getRandomSquareSide(maxSquareSizeInColumns);
    const isEndOfLine = currentColumn === columnsCount || currentColumn === -1;

    if (isEndOfLine) {
      currentRow += 1;
      currentColumn = squaresMap[currentRow].findIndex((el) => el === 0);
    }

    if (isSquareFit(squaresMap, currentRow, currentColumn, sideInElementarySquares)) {
      for (let j = 0; j < sideInElementarySquares; j += 1) {
        for (let i = 0; i < sideInElementarySquares; i += 1) {
          squaresMap[currentRow + i][currentColumn + j] = mapNumber;
        }
      }

      result.push({
        xstart: currentColumn + 1,
        xend: currentColumn + 1 + sideInElementarySquares,
        ystart: currentRow + 1,
        yend: currentRow + 1 + sideInElementarySquares,
      });
      currentColumn = squaresMap[currentRow].findIndex((el) => el === 0);
      mapNumber += 1;
    }
  }

  return result;
};
