# Pixel Viewer Interactive

**Author:** Jack Morgan  
**Modified by:** Andy Bell, Courtney Bracefield, Alasdair Smith

This interactive is created to allow users to see the values of each pixel of an image.
The user can zoom in and out of the image, and when close enough the pixel values are displayed.

## Usage

The interactive has the following parameters to configure the interactive:

- `mode=type` (optional) - Where `type` is one of the following:

  - `datarep` (default) - Normal for viewing pixels in image.
  - `threshold` - Adds controls for manipulating pixels by threshold controls for colour pixels.
  - `thresholdgreyscale` - Adds controls for manipulating pixels by threshold controls for greyscale pixels.
  - `blur` - Adds controls for investigating blurring with images.
  - `edgedetection` - Adds controls for investigating edge detection.

- `colour-code=type` (optional) - Where `type` is one of the following:

  - `rgb` (default) - Shows the colour of the pixel in RGB format.
  - `hex` - Shows the colour of the pixel in Hexadecimal format.

- `image` (optional) - Filename of image to use (for example `arnold.jpg`).
- `picturepicker` (optional) - Displays a set of pictures available for using.
- `hide-menu` (optional) - Hides the menu.
- `no-pixel-fill` (optional) - Displays pixels without background fill from start (also doesn't show initial image with transition).

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

Several [ZYNGA JavaScript Libraries](zynga.github.io/scroller/) are also used.
Its licence, and others, is listed in the `license.md` file.

## Future Plans

- Investigate performance increases as the interactive is sluggish when zooming out and viewing many pixels. A possible option may include not creating image with pixels until the image is zoomed in, or use a magnifying glass approach to highlight just a few pixels at a time.
- Investigate the original image sizing, as images are currently resized to a small amount to lower the number of pixels to create.
