# Image Bit Comparer Interactive

**Author:** Jack Morgan

This interactive is created to compare an image at different bit settings.

## Usage

The interactive has two modes:

1. Comparison Mode - Allows comparing multiple bits levels of a single image. Defaults to this mode.
2. Change Bits Mode - Provides two images which allow the maximum bit values to be set. Accessed by appending `?change-bits=true` to the end of the URL.

## Image Sources

The initial images used in this interactive are from the following sources:

- `IMG_0775.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_2223.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_2521.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_5035.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_5264.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_6698.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_7448.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_8061.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `IMG_8354.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `wedding-vehicle.jpg`: Photograph taken by [Jack Morgan](https://github.com/JackMorganNZ) and used with permission.
- `person.jpg`: By Governor-General of New Zealand [CC BY-SA 4.0](https://commons.wikimedia.org/w/index.php?curid=69052867).
- `black-and-white.jpg`: Photograph taken by [Karl Morlock](https://www.flickr.com/photos/kamokonzept/17253127915/in/photolist-shAMQF-5PhFUk-4iDjdU-p3JgMV-shbDSY-bsu1BY-iw5KXF-4hqYDY-mNhrJR-so1AwY-rBQnD6-jqB4ng-nGLwVZ-qqBZe8-pH5Bp7-qeEkNY-q2rdEh-nwXDBa-jGPiYv-zVSXBR-o2C9tv-eRYwBj-o27sda-q5ejKT-rPVXGd-8RCQph-r7EB7d-shbssh-qQbUUC-pXE9Nu-pCjZia-ryBbAw-8sjHyA-qgLuPz-82Diau-dCKXHx-6ygCx2-ofBA8y-8GGV2G-pYBYaw-pZZpZu-kfWGcJ-yxRg65-fT2mPr-zsCFds-dvTbCG-p23oaj-7Vo9oV-rXjviT-bzqHeo) and is available in the Public domain.

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

## Related Articles

- [Faster Canvas Pixel Manipulation with Typed Arrays](https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/) by Paul Rouget was useful in planning out the canvas manipulation.
