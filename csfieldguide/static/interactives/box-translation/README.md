# WebGL 3D Box Translation

**Created by:** Hayley van Waas
**Modified by:** Alasdair Smith

This interactive allows the translation of an object in 3D space for users to identify which side is coloured.

## Required files

This interactive shares a large amount of source code with the Box Rotation interactive, for this reason most source files are in shared folders. When editing this interactive, please check that changes do not adversely affect the behaviour of the Box Rotation interactive.

The location of relevant files for this interactive in the shared folders are given here:

    static/
    ├── img/interactives/
    │   ├── colourful-box-images/*
    │   └── translation-rotation-interactives-images/*
    ├── js/
    │   ├── third-party/threejs/Detector.js
    │   └── translation-rotation-interactives/*
    └── scss/
        └── translation-rotation-interactives/*

In addition, this interactive also requires two third-party libraries:

- tween.js
- three

## Licences

The third-party libraries `three.js` and `tween.js` are used in these interactives, their corresponding licence files are included in the `third-party-licences` directory.
The `Detector.js` file was obtained from a [fork](https://github.com/alteredq/three.js/blob/master/examples/js/Detector.js) of the `three.js` library, then modified by Alasdair Smith.
Its licence is included in the same directory.
