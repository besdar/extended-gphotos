import React, { FC, useEffect, useState } from "react";
import ImageItem, { ImageItemPropsType, ImageItemType } from "../ImageItem/ImageItem";
import s from './ImageGallery.module.css';
import { getGalleryStructureData } from "../GalleryStructure";

const changeImageInArray = (ImageArray: Array<ImageItemPropsType>, getRandomImage: getRandomImageFuncType, simultaneouslyImageChanging = 3) => {
    if (ImageArray.length !== 0) {
        for (let i = 0; i < simultaneouslyImageChanging; i++) {
            const randomIndex = Math.floor(Math.random() * (ImageArray.length - 1));
            const randomImage = getRandomImage();

            if (ImageArray[randomIndex].isFirstImageActive) {
                ImageArray[randomIndex] = {
                    ...ImageArray[randomIndex],
                    isFirstImageActive: false,
                    anotherImageUrl: randomImage.imageUrl,
                    tooltipTitle: randomImage.tooltipTitle,
                    webUrl: randomImage.webUrl,
                };
            } else {
                ImageArray[randomIndex] = {
                    ...ImageArray[randomIndex],
                    isFirstImageActive: true,
                    imageUrl: randomImage.imageUrl,
                    tooltipTitle: randomImage.tooltipTitle,
                    webUrl: randomImage.webUrl,
                };
            }
        }
    }

    return ImageArray;
}

type getRandomImageFuncType = () => ImageItemType;
type galleryStructureParamsType = [
        mapHeight: number,
        mapWidth: number,
        minSquareSide: number,
        timesNumberMaxSideGreaterThanMinSide: number,
    ];
type ImageGalleryPropsType = {
    simultaneouslyImageChanging?: number,
    getRandomImage: getRandomImageFuncType,
    galleryStructureConfig?: galleryStructureParamsType
}

const ImageGallery: FC<ImageGalleryPropsType> = ({
    getRandomImage,
    galleryStructureConfig,
    simultaneouslyImageChanging, 
}) => {
    const [imagesData, setImagesData] = useState([] as Array<ImageItemPropsType>);
    const [rowLength, setRowLength] = useState(1);

    useEffect(() => {
        const galleryStructureParams: galleryStructureParamsType = galleryStructureConfig ? galleryStructureConfig : [window.innerHeight, window.innerWidth, 100, 3];
        const galleryStructure = getGalleryStructureData(...galleryStructureParams);
        
        const imageDataFromStructure = galleryStructure.imagesStructureData.map(imageStructureData => {
            const randomImageInfo = getRandomImage();

            return {
                squareCoordinates: {
                    ...imageStructureData,
                },
                ...randomImageInfo,
                anotherImageUrl: randomImageInfo.imageUrl,
                isFirstImageActive: true,
            };
        });

        setImagesData(imageDataFromStructure);
        setRowLength(galleryStructure.rowLength);

        const interval = setInterval(() => {
            setImagesData(imagesData => changeImageInArray([...imagesData], getRandomImage, simultaneouslyImageChanging));
        }, 5000);

        return () => clearInterval(interval);
    }, [galleryStructureConfig, getRandomImage, simultaneouslyImageChanging]);


    return (
        <div
            className={s.gallery}
            style={{ height: window.innerHeight, gridTemplateColumns: `repeat(${rowLength}, 1fr)` }}>
            {imagesData.map((imageProps, index) => (
                <ImageItem
                    key={index}
                    {...imageProps}
                />
            ))}
        </div>
    );
}

export default ImageGallery;