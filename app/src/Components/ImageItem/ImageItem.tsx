import React, { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import s from './ImageItem.module.css';
import { SquareType } from '../GalleryStructure';

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
  exitActive: s.imageExitActive,
};

const ImageItem: FC<ImageItemPropsType> = ({
  isFirstImageActive,
  imageUrl,
  anotherImageUrl,
  squareCoordinates,
  tooltipTitle,
  webUrl,
}) => {
  const firstImage = useRef<HTMLImageElement>(null);
  const secondImage = useRef<HTMLImageElement>(null);
  const gridArea = squareCoordinates && `${squareCoordinates.ystart}/${squareCoordinates.xstart}/${squareCoordinates.yend}/${squareCoordinates.xend}`;

  return (
    <>
      <CSSTransition
        in={isFirstImageActive}
        timeout={3000}
        mountOnEnter
        unmountOnExit
        classNames={transitionClassNames}
        nodeRef={firstImage}
      >
        <a href={webUrl} target="_blank" rel="noreferrer">
          <img
            title={tooltipTitle}
            alt={tooltipTitle}
            onClick={() => window.open(webUrl)}
            ref={firstImage}
            className={s.image}
            src={imageUrl}
            style={{ gridArea }}
            aria-hidden
          />
        </a>
      </CSSTransition>
      <CSSTransition
        in={!isFirstImageActive}
        timeout={3000}
        mountOnEnter
        unmountOnExit
        classNames={transitionClassNames}
        nodeRef={secondImage}
      >
        <a href={webUrl} target="_blank" rel="noreferrer">
          <img
            title={tooltipTitle}
            alt={tooltipTitle}
            ref={secondImage}
            className={s.image}
            src={anotherImageUrl}
            style={{ gridArea }}
          />
        </a>
      </CSSTransition>
    </>
  );
};

export default React.memo(ImageItem);
