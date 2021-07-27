import React, { FC, useEffect, useState } from 'react';
import ImageItem, { ImageItemPropsType, ImageItemType } from '../ImageItem/ImageItem';
import s from './ImageGallery.module.css';
import { galleryStructureParamsType, getGalleryStructureData } from '../GalleryStructure';

const changeImageInArray = (
  ImageArray: Array<ImageItemPropsType & { id: number }>,
  getRandomImage: getRandomImageFuncType,
  simultaneouslyImageChanging = 3,
) => {
  const ImagesData = [...ImageArray];

  if (ImagesData.length !== 0) {
    const uniqueIndexes = new Set<number>();
    for (let i = 0; i < simultaneouslyImageChanging; i += 1) {
      uniqueIndexes.add(Math.floor(Math.random() * (ImagesData.length - 1)));
    }

    uniqueIndexes.forEach((randomIndex) => {
      const randomImage = getRandomImage();

      if (ImagesData[randomIndex].isFirstImageActive) {
        ImagesData[randomIndex] = {
          ...ImagesData[randomIndex],
          isFirstImageActive: false,
          anotherImageUrl: randomImage.imageUrl,
          tooltipTitle: randomImage.tooltipTitle,
          webUrl: randomImage.webUrl,
        };
      } else {
        ImagesData[randomIndex] = {
          ...ImagesData[randomIndex],
          isFirstImageActive: true,
          imageUrl: randomImage.imageUrl,
          tooltipTitle: randomImage.tooltipTitle,
          webUrl: randomImage.webUrl,
        };
      }
    });
  }

  return ImagesData;
};

type getRandomImageFuncType = () => ImageItemType;
type ImageGalleryPropsType = {
    getRandomImage: getRandomImageFuncType,
    containerHeight: number,
    galleryStructureConfig: galleryStructureParamsType,
    simultaneouslyImageChanging?: number,
}

const ImageGallery: FC<ImageGalleryPropsType> = ({
  getRandomImage,
  containerHeight,
  galleryStructureConfig,
  simultaneouslyImageChanging,
}) => {
  const [imagesData, setImagesData] = useState([] as Array<ImageItemPropsType & { id: number }>);

  useEffect(() => {
    const imagesStructureData = getGalleryStructureData(galleryStructureConfig);

    let counter = 0;
    const imageDataFromStructure = imagesStructureData.map((imageStructureData) => {
      const randomImageInfo = getRandomImage();
      counter += 1;

      return {
        squareCoordinates: {
          ...imageStructureData,
        },
        ...randomImageInfo,
        anotherImageUrl: randomImageInfo.imageUrl,
        isFirstImageActive: true,
        id: counter,
      };
    });

    setImagesData(imageDataFromStructure);

    const interval = setInterval(() => {
      setImagesData((imagesDataOld) => (
        changeImageInArray(imagesDataOld, getRandomImage, simultaneouslyImageChanging)
      ));
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryStructureConfig, getRandomImage, simultaneouslyImageChanging]);

  return (
    <div
      className={s.gallery}
      style={{ height: containerHeight, gridTemplateColumns: `repeat(${galleryStructureConfig.columnsCount}, 1fr)` }}
    >
      {imagesData.map((imageProps) => (
        <ImageItem
          key={imageProps.id}
          anotherImageUrl={imageProps.anotherImageUrl}
          isFirstImageActive={imageProps.isFirstImageActive}
          squareCoordinates={imageProps.squareCoordinates}
          imageUrl={imageProps.imageUrl}
          tooltipTitle={imageProps.tooltipTitle}
          webUrl={imageProps.webUrl}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
