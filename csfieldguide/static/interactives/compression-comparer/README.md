# Compression Comparer Interactive

**Author:** Jack Morgan

This interactive is created for the compression chapter to show the user the difference between two images stored at different file sizes.

The images used are taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission, under the CSFG license. The original source image (a 20MB CR2 file) can be found within the [uccser-extras repo](https://github.com/uccser/uccser-extras). The photos are of Lake Rotoiti in New Zealand.

## Required Files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

The code used for the slider is adapted from [before-after.js](https://github.com/jotform/before-after.js), used under the MIT License.
Its licence is listed in `LICENCE-THIRD-PARTY`, with a full copy available in the `third-party-licences` directory.

## Future Plans

- Allow users to upload an image, compress a copy of the image and compare the two.
