import React, { FC } from 'react';
import { getRandomKinopoiskImageInfo } from './api/kinopoisk/kinopoisk-films-data';
import { FilmsData } from './api/kinopoisk/kinopoisk-films-object';
import { calculateGalleryStructureParams } from './Components/GalleryStructure';
import ImageGallery from './Components/ImageGallery/ImageGallery';

const App: FC = () => {
  const galleryStructureConfig = calculateGalleryStructureParams(
    window.innerHeight,
    window.innerWidth,
    window.innerWidth / 3 > 300 ? 100 : 50,
    window.innerWidth / 3 > 300 ? 300 : 150,
  );

  if (galleryStructureConfig === null) {
    return null;
  }

  return (
    <ImageGallery
      getRandomImage={getRandomKinopoiskImageInfo(FilmsData)}
      galleryStructureConfig={galleryStructureConfig}
      containerHeight={window.innerHeight}
    />
  );
};

export default App;
