// https://kinopoiskapiunofficial.tech
const API_KEY = 'YOUR_API_KEY';

type KinopoiskFrameType = {
  image: string,
  preview: string,
}

type KinopoiskFrameResponseType = {
  frames: Array<KinopoiskFrameType>
}

export const getFramesFromAPI = async (filmId: number): Promise<KinopoiskFrameResponseType> => fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}/frames`, {
  headers: {
    'X-API-KEY': API_KEY,
  },
})
  .then((response) => response.json())
  .catch(() => ({ frames: [] }));

type KinopoiskFilmInfoType = {
  nameRu: string,
  webUrl: string,
  // other staff
}

type KinopoiskFilmInfoResponseType = {
  data: KinopoiskFilmInfoType,
  // other staff
}

export const getFilmInfoFromAPI = async (filmId: number): Promise<KinopoiskFilmInfoType> => fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}`, {
  headers: {
    'X-API-KEY': API_KEY,
  },
})
  .then((response) => response.json())
  .then(({ data: { nameRu, webUrl } }: KinopoiskFilmInfoResponseType) => ({ nameRu, webUrl }))
  .catch(() => ({ nameRu: '', webUrl: '' }));
