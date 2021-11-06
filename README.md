# Live Tiles Gallery

Live Tiles Gallery is a React component which render tile-like gallery with random images changes.

### Live Demo

[`besdar.github.io/live-tiles-gallery`](https://besdar.github.io/live-tiles-gallery/)

## Features

* Responsive, accessible, composable, and customizable image gallery component 
* Maintains the original aspect ratio of your photos
* Creates a masonry or justified grid 
* Fullscreen support

## Props

* `galleryStructureConfig`: (required) Object with configuration of gallery structure, see example above,
    * Available Properties
        * `rowsCount` - count of rows of the gallery
        * `columnsCount` - count of columns of the gallery
        * `maxSquareSizeInColumns` - max image size in columns/rows
* `getRandomImage`: (required) Function that returns random image
* `containerHeight`: Height of the gallery container
* `simultaneouslyImageChanging`: Count of images that needs to be simultaneously be changed (default is 3)

## Build the component locally (requires node >= 12.13)

```
git clone https://github.com/besdar/live-tiles-gallery.git
cd live-tiles-gallery
npm ci
npm run start
```