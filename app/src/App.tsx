import React, { FC } from 'react';
import { getRandomKinopoiskImageInfo } from './api/kinopoisk-films-data';
import { FilmsData } from './api/kinopoisk-films-object';
import ImageGallery from './Components/ImageGallery/ImageGallery'

const App: FC = () => (
<ImageGallery
  getRandomImage={getRandomKinopoiskImageInfo(FilmsData)}
  galleryStructureConfig={[
    window.innerHeight,
    window.innerWidth,
    100,
    3,
  ]}
/>
);

export default App;
