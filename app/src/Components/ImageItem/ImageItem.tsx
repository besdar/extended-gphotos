import React, { FC, useRef } from "react";
import { CSSTransition } from 'react-transition-group';
import s from './ImageItem.module.css';
import { SquareType } from "../GalleryStructure";

export type ImageItemType = {
    imageUrl: string,
    tooltipTitle?: string,
    webUrl?: string,
}

export type ImageItemPropsType = ImageItemType & {
    anotherImageUrl: string,
    isFirstImageActive: boolean,
    squareCoordinates?: SquareType
}

const transitionClassNames = {
    enter: s.imageEnter,
    exit: s.imageExit,
    enterActive: s.imageEnterActive,
    enterDone: s.imageEnterDone,
    exitDone: s.imageExitDone,
    exitActive: s.imageExitActive
};

const ImageItem: FC<ImageItemPropsType> = ({
    isFirstImageActive,
    imageUrl,
    anotherImageUrl,
    squareCoordinates,
    tooltipTitle,
    webUrl,
}) => {
    const firstImage = useRef<HTMLDivElement>(null);
    const secondImage = useRef<HTMLDivElement>(null);
    const gridArea = squareCoordinates && `${squareCoordinates.ystart}/${squareCoordinates.xstart}/${squareCoordinates.yend}/${squareCoordinates.xend}`;

    return <React.Fragment>
        <CSSTransition
            in={isFirstImageActive}
            timeout={3000}
            mountOnEnter
            unmountOnExit
            classNames={transitionClassNames}
            nodeRef={firstImage}
        >
            <div
                title={tooltipTitle}
                onClick={() => window.open(webUrl)}
                ref={firstImage}
                className={s.image}
                style={{ gridArea: gridArea, backgroundImage: `url(${imageUrl})` }}
            />
        </CSSTransition>
        <CSSTransition
            in={!isFirstImageActive}
            timeout={3000}
            mountOnEnter
            unmountOnExit
            classNames={transitionClassNames}
            nodeRef={secondImage}
        >
            <div
                title={tooltipTitle}
                onClick={() => window.open(webUrl)}
                ref={secondImage}
                className={s.image}
                style={{ gridArea: gridArea, backgroundImage: `url(${anotherImageUrl})` }}
            />
        </CSSTransition>
    </React.Fragment>
};

export default React.memo(ImageItem);
