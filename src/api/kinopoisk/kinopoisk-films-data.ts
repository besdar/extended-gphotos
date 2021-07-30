import { ImageItemType } from '../../Components/ImageItem/ImageItem';
import { getFilmInfoFromAPI, getFramesFromAPI } from './api';
import { FilmsDataType } from './kinopoisk-films-object';

// Caution: This is very resource-intensive function
export const getFilmCovers = async (filmsIds: Array<number>): Promise<FilmsDataType> => (
  new Promise((resolve) => {
    const result = [] as FilmsDataType;
    const filmsIdsLength = filmsIds.length;

    filmsIds.forEach((filmId, index) => {
      setTimeout(async () => {
        const framesObject = await getFramesFromAPI(filmId);
        const infoObject = await getFilmInfoFromAPI(filmId);
        const newElements = framesObject.frames.filter(Object.entries).map((el) => ({
          ...el,
          ...infoObject,
        }));

        if (newElements.length) {
          result.push(...newElements);
        }

        if (index + 1 === filmsIdsLength) {
          resolve(result);
        }
      }, index * 1000); // prevent ban from server
    });
  })
);

export const getRandomKinopoiskImageInfo = (ImagesData: FilmsDataType) => (
  (previewImage = true): ImageItemType => {
    const randomIndex = Math.floor(Math.random() * (ImagesData.length - 1));

    return {
      imageUrl: previewImage ? ImagesData[randomIndex].preview : ImagesData[randomIndex].image,
      tooltipTitle: ImagesData[randomIndex].nameRu,
      webUrl: ImagesData[randomIndex].webUrl,
    };
  }
);
