import React, { FC, useEffect, useState } from 'react';
import ImageItem, { ImageItemPropsType, ImageItemType } from '../ImageItem/ImageItem';
import * as s from './ImageGallery.module.css';
import { galleryStructureParamsType, getGalleryStructureData } from '../GalleryStructure';

const changeImageInArray = (
  ImageArray: Array<ImagesDataType>,
  getRandomImage: getRandomImageFuncType,
  simultaneouslyImageChanging: number,
) => {
  if (
    ImageArray.length === 0
    || simultaneouslyImageChanging <= 0
    || simultaneouslyImageChanging >= ImageArray.length - 1
  ) {
    return ImageArray;
  }

  const ImagesData = [...ImageArray];

  const uniqueIndexes = new Set<number>();
  while (uniqueIndexes.size !== simultaneouslyImageChanging) {
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

  return ImagesData;
};

type ImagesDataType = ImageItemPropsType & { id: number };
type getRandomImageFuncType = () => ImageItemType;
type ImageGalleryPropsType = {
  getRandomImage: getRandomImageFuncType,
  galleryStructureConfig: galleryStructureParamsType,
  containerHeight?: number | string,
  simultaneouslyImageChanging?: number,
}

const ImageGallery: FC<ImageGalleryPropsType> = ({
  getRandomImage,
  galleryStructureConfig,
  containerHeight = '100%',
  simultaneouslyImageChanging = 3,
}) => {
  const [imagesData, setImagesData] = useState([] as Array<ImagesDataType>);

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
