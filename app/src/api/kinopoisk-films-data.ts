

import { ImageItemType } from "../Components/ImageItem/ImageItem";
import { FilmsDataType } from "./kinopoisk-films-object";

// https://kinopoiskapiunofficial.tech
const API_KEY = 'YOUR_API_KEY';

type KinopoiskFrameType = {
    image: string,
    preview: string,
}

type KinopoiskFrameResponseType = {
    frames: Array<KinopoiskFrameType>
}

const getFramesFromAPI = async (filmId: number): Promise<KinopoiskFrameResponseType> => {
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}/frames`, {
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    if (response.status === 200) {
        return response.json()
    }

    return {
        frames: []
    };
};


type KinopoiskFilmInfoType = {
    nameRu: string,
    webUrl: string,
    // other staff
}

type KinopoiskFilmInfoResponseType = {
    data: KinopoiskFilmInfoType,
    // other staff
}

const getFilmInfoFromAPI = async (filmId: number): Promise<KinopoiskFilmInfoType | null> => {
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}`, {
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    if (response.status === 200) {
        const { data: result } = await response.json() as KinopoiskFilmInfoResponseType;

        return Promise.resolve({
            nameRu: result.nameRu,
            webUrl: result.webUrl
        })
    }

    return null;
}

// Caution: This is very resource-intensive function
export const getFilmCovers = async (filmsIds: Array<number>) => (
    new Promise(resolve => {
        const result = [] as FilmsDataType;
        const filmsIdsLength = filmsIds.length;

        filmsIds.forEach((filmId, index) => {
            setTimeout(async () => {
                const framesObject = await getFramesFromAPI(filmId);
                const infoObject = await getFilmInfoFromAPI(filmId);

                if (infoObject !== null) {
                    const newElements = framesObject.frames.filter(Object.entries).map(el => ({
                        ...el,
                        ...infoObject,
                    }));

                    result.push(...newElements);
                }


                if (index + 1 === filmsIdsLength) {
                    resolve(result)
                }
            }, index * 1000); // prevent ban from server
        })
    })
);

export const getRandomKinopoiskImageInfo = (ImagesData: FilmsDataType) => (previewImage = true): ImageItemType => {
    const randomIndex = Math.floor(Math.random() * (ImagesData.length - 1));

    return {
        imageUrl: previewImage ? ImagesData[randomIndex].preview : ImagesData[randomIndex].image,
        tooltipTitle: ImagesData[randomIndex].nameRu,
        webUrl: ImagesData[randomIndex].webUrl,
    };
};