# Pixel Viewer Interactive

**Author:** Jack Morgan

This interactive is created to allow users to see the values of each pixels of an image.
The user can zoom in and out of the image, and when close enough the pixel values are displayed.

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).
- The original image was taken by [Jack Morgan](jack.morgan@canterbury.ac.nz) and is used with his permission under the same Creative Commons license this project uses.
- Several [ZYNGA JavaScript Libraries](zynga.github.io/scroller/) are used under the following license:

  Copyright (c) 2011 Zynga Inc., http://zynga.com/

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Future Plans

- Investigate performance increases as the interactive is sluggish when zooming out and viewing many pixels. A possible option may include not creating image with pixels until the image is zoomed in, or use a magnifying glass approach to highlight the each being zoomed.
- Investigate the original image sizing, as images are currently resized to a small amount to lower the number of pixels to create.
