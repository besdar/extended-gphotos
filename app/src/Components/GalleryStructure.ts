const isSquareFit = (squaresMap: number[][], currentRow: number, currentColumn: number, elementarySquareSideCount: number) => {
    for (let i = currentRow; i < currentRow + elementarySquareSideCount; i++) {
        for (let j = currentColumn; j < currentColumn + elementarySquareSideCount; j++) {
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

const getRandomSquareSide = (minSquareSide: number, timesNumberMaxSideGreaterThanMinSide: number): number => {
    if (timesNumberMaxSideGreaterThanMinSide === 0) {
        return minSquareSide;
    }

    return minSquareSide * Math.round(Math.random()) + getRandomSquareSide(minSquareSide, timesNumberMaxSideGreaterThanMinSide - 1);
};

const generateSquaresMap = (mapHeight: number, mapWidth: number, squareSideLength: number) => {
    const rowLength = Math.floor(mapWidth / squareSideLength);

    if (rowLength === 0) {
        return [];
    }

    const rowsCount = Math.floor(mapHeight / squareSideLength);
    const squaresMap = [] as number[][];

    for (let i = 0; i < rowsCount; i++) {
        squaresMap.push(new Array(rowLength).fill(0));
    }

    return squaresMap;
};

export type SquareType = {
    xstart: number,
    xend: number,
    ystart: number,
    yend: number,
}

export const getGalleryStructureData = (mapHeight: number, mapWidth: number, minSquareSide: number, timesNumberMaxSideGreaterThanMinSide: number) => {
    const squaresMap = generateSquaresMap(mapHeight, mapWidth, minSquareSide);
    const result = {
        imagesStructureData: [] as SquareType[],
        rowLength: 0,
    }

    if (squaresMap.length === 0) {
        return result;
    }

    result.rowLength = squaresMap[0].length;
    const rowsCount = squaresMap.length;
    let currentRow = 0;
    let currentColumn = 0;
    let mapNumber = 1;

    while (true) {
        const squareSide = getRandomSquareSide(minSquareSide, timesNumberMaxSideGreaterThanMinSide);
        const sideInElementarySquares = squareSide / minSquareSide;

        if (isSquareFit(squaresMap, currentRow, currentColumn, sideInElementarySquares)) {
            for (let j = 0; j < sideInElementarySquares; j++) {
                for (let i = 0; i < sideInElementarySquares; i++) {
                    squaresMap[currentRow + i][currentColumn + j] = mapNumber
                }
            }

            result.imagesStructureData.push({
                xstart: currentColumn + 1,
                xend: currentColumn + 1 + sideInElementarySquares,
                ystart: currentRow + 1,
                yend: currentRow + 1 + sideInElementarySquares,
            });
            currentColumn = squaresMap[currentRow].findIndex(el => el === 0);
            mapNumber = mapNumber + 1;
        }

        if ((currentColumn === result.rowLength || currentColumn === -1) && currentRow === rowsCount - 1) {
            break;
        }

        if (currentColumn === result.rowLength || currentColumn === -1) {
            currentRow = currentRow + 1;
            currentColumn = squaresMap[currentRow].findIndex(el => el === 0);
        }
    }

    return result;
};