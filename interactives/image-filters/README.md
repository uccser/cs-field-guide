# Image Filters Interactive

**Author:** Hayden Jackson

This interactive is created to compare an image at different bit settings.

## Usage

The interactive has two modes:

1. Simple Mode - Allows for custom 3x3 kernel filters, with mirrored edges. Defaults to this mode.
2. Complex Mode - Allows for custom square kernels of size 3, 5, 7, 9. Accessed by appending `?change-kernel-size=true` to the end of the URL.

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
- `faces.jpg`: Photograph taken by [Prime Minister's Office](https://www.flickr.com/photos/us_embassy_newzealand/15875272743/in/photostream/) of Ambassador Gilbert meeting with John Key. This photograph is in the public domain in the United States because it is a [work prepared by an officer or employee of the United States Government as part of that person’s official duties](https://en.wikipedia.org/wiki/Copyright_status_of_work_by_the_U.S._government) under the terms of Title 17, Chapter 1, Section 105 of the US Code.
- `black-and-white.jpg`: Photograph taken by [Karl Morlock](https://www.flickr.com/photos/kamokonzept/17253127915/in/photolist-shAMQF-5PhFUk-4iDjdU-p3JgMV-shbDSY-bsu1BY-iw5KXF-4hqYDY-mNhrJR-so1AwY-rBQnD6-jqB4ng-nGLwVZ-qqBZe8-pH5Bp7-qeEkNY-q2rdEh-nwXDBa-jGPiYv-zVSXBR-o2C9tv-eRYwBj-o27sda-q5ejKT-rPVXGd-8RCQph-r7EB7d-shbssh-qQbUUC-pXE9Nu-pCjZia-ryBbAw-8sjHyA-qgLuPz-82Diau-dCKXHx-6ygCx2-ofBA8y-8GGV2G-pYBYaw-pZZpZu-kfWGcJ-yxRg65-fT2mPr-zsCFds-dvTbCG-p23oaj-7Vo9oV-rXjviT-bzqHeo) and is available in the Public domain.

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).

## Related Articles

- [Faster Canvas Pixel Manipulation with Typed Arrays](https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/) by Paul Rouget was useful in planning out the canvas manipulation.
