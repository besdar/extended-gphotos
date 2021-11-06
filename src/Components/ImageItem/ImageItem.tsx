import React, { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as s from './ImageItem.module.css';
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
  const firstImage = useRef<HTMLAnchorElement>(null);
  const secondImage = useRef<HTMLAnchorElement>(null);
  const gridArea = squareCoordinates && `${squareCoordinates.ystart}/${squareCoordinates.xstart}/${squareCoordinates.yend}/${squareCoordinates.xend}`;

  // TODO: Change null inside A tag onto img
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
        <a
          href={webUrl}
          target="_blank"
          rel="noreferrer"
          className={s.image}
          style={{ gridArea, backgroundImage: `url(${imageUrl})` }}
          title={tooltipTitle}
          ref={firstImage}
        >
          {null}
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
        <a
          href={webUrl}
          target="_blank"
          rel="noreferrer"
          className={s.image}
          style={{ gridArea, backgroundImage: `url(${anotherImageUrl})` }}
          title={tooltipTitle}
          ref={secondImage}
        >
          {null}
        </a>
      </CSSTransition>
    </>
  );
};

export default React.memo(ImageItem);
