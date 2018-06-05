# Pixel Viewer Interactive

**Author:** Jack Morgan  
**Updated by:** Andy Bell

This interactive is created to allow users to see the values of each pixels of an image.
The user can zoom in and out of the image, and when close enough the pixel values are displayed.

## Usage

The interactive has the following parameters to configure the interactive:

- `mode=type` (optional) - Where `type` is one of the following:

  - `datarep` (default) - Normal for viewing pixels in image.
  - `threshold` - Adds controls for manipulating pixels by threshold controls for colour pixels.
  - `thresholdgreyscale` - Adds controls for manipulating pixels by threshold controls for greyscale pixels.
  - `blur` - Adds controls for investigating blurring with images.
  - `edgedetection` - Adds controls for investigating edge detection.

- `image` (optional) - Filename of image to use (for example `arnold.jpg`).
- `picturepicker` (optional) - Displays a set of pictures available for using.
- `hide-menu` (optional) - Hides the menu.
- `no-pixel-fill` (optional) - Displays pixels without background fill from start (also doesn't show initial image with transition).

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).
- Several [ZYNGA JavaScript Libraries](zynga.github.io/scroller/) are used.

## Future Plans

- Investigate performance increases as the interactive is sluggish when zooming out and viewing many pixels. A possible option may include not creating image with pixels until the image is zoomed in, or use a magnifying glass approach to highlight the each being zoomed.
- Investigate the original image sizing, as images are currently resized to a small amount to lower the number of pixels to create.
