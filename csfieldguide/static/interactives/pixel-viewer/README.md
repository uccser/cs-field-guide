# Pixel Viewer Interactive

**Author:** Jack Morgan
**Modified by:** Andy Bell, Courtney Bracefield, Alasdair Smith, Jack Morgan

This interactive is created to allow users to see the values of each pixel of an image.
The user can zoom in and out of the image, and when close enough the pixel values are displayed.

## Usage

The interactive has the following optional parameters to configure the interactive:

- `mode=type` - Where `type` is one of the following:

  - `datarep` (default) - Normal for viewing pixels in image.
  - `threshold` - Adds controls for manipulating pixels by threshold controls for colour pixels.
  - `thresholdgreyscale` - Adds controls for manipulating pixels by threshold controls for greyscale pixels.
  - `blur` - Adds controls for investigating blurring with images.
  - `edgedetection` - Adds controls for investigating edge detection.
  - `brightness` - Shows the pixels in greyscale, but without the extra features of `thresholdgreyscale`.

- `colour-code=type` - Where `type` is one of the following:

  - `rgb` (default) - Shows the colour of the pixel in RGB format using Decimal.
  - `rgb-hex` - Shows the colour of the pixel in RGB format using Hexadecimal.
  - `hex` - Shows the colour of the pixel in Hexadecimal format.
  - `brightness` - Shows the brightness (i.e greyscale value) of the pixel as a value up to 255.

- `image` - Filename of image to use (for example `arnold.jpg`).
- `picturepicker` - Displays a set of pictures available for using.
- `hide-menu` - Hides the menu.
- `hide-colour-codes` - Hides the colour codes within pixels.
- `hide-colour-code-picker` - Hides the option to change between colour code formats.
- `hide-config-selector` - Hides the option to change between modes.
- `no-pixel-fill` - Displays pixels without background fill from start (also doesn't show initial image with transition).
- `preset-zoom` - Sets the initial zoom of the interactive, skipping the establishing zoom animation. Must be a value between 0.01 and 4.
- `pixelmania` - (for Pixelmania 2020) Shows a small Pixelmania logo above the title in the menu.

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

Several [ZYNGA JavaScript Libraries](zynga.github.io/scroller/) are also used.
Its licence, and others, is listed in the `license.md` file.

## Future Plans

- Investigate performance increases as the interactive is sluggish when zooming out and viewing many pixels. A possible option may include not creating image with pixels until the image is zoomed in, or use a magnifying glass approach to highlight just a few pixels at a time.
- Investigate the original image sizing, as images are currently resized to a small amount to lower the number of pixels to create.
