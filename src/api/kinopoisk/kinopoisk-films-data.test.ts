// import { getFilmInfoFromAPI, getFramesFromAPI } from "./api";
import { getRandomKinopoiskImageInfo } from './kinopoisk-films-data';
import { FilmInfo } from './kinopoisk-films-object';

// jest.mock('./api', () => ({
//     getFilmInfoFromAPI: jest.fn(),
//     getFramesFromAPI: jest.fn(),
// }));

describe('Tests for getRandomKinopoiskImageInfo function', () => {
  const ImageData = [
    {
      image: 'image1',
      nameRu: 'nameRu1',
      preview: 'prewiew1',
      webUrl: 'webUrl1',
    },
  ] as Array<FilmInfo>;

  it('Returns random object with preview image', () => {
    expect(getRandomKinopoiskImageInfo(ImageData)()).toMatchSnapshot();
  });

  it('Returns random object without preview image', () => {
    expect(getRandomKinopoiskImageInfo(ImageData)(false)).toMatchSnapshot();
  });
});

// TODO: Can not mock setTimeout with Promises. setTimeout never triggers,
// Promises (fetch) never resolves or return undefined
// describe('Tests for getFilmCovers function', () => {
//     beforeAll(() => {
//         jest.useFakeTimers('legacy');

//         (getFilmInfoFromAPI as jest.Mock).mockImplementation(async () => Promise.resolve({
//             data: { nameRu: 'nameRu', webUrl: 'webUrl' }
//         }));

//         (getFramesFromAPI as jest.Mock).mockImplementation(async () => Promise.resolve({
//             frames: [{ image: 'image', preview: 'preview' }]
//         }));
//     });

//     it('Create film data from api', () => {
//         const resultPromise = getFilmCovers([1, 2]);

//         jest.runAllTimers();

//         return resultPromise.then(result => {
//             expect(result).not.toHaveLength(0);
//             expect(result).toMatchSnapshot();
//         });
//     })
// });
