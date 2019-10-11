# Scene Editor Interactive

**Authors:** Courtney Bracefield, Alasdair Smith

Allows the user to apply 3D matrix transformations to objects in a scene

Built from scratch to replace https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-mini-editor/main%20%28cutdown%29.html (unknown original author).

## Modes

The interactive has four modes, defined by url parameters:

- `(default)`: **Scene creation mode**; user can add any number of default objects, switch between them, and apply a single transform and translation to each one.
- `?mode=translation`: **Translation mode**; the user can apply a single translation vector to a single object in the scene.
- `?mode=transform`: **Transform mode**; the user can apply a single transform matrix to a single object in the scene.
- `?mode=multiple`: **Multiple matrices mode**; The user can apply matrices and vectors repeatedly to a single object in a scene.

## Licences

This interactive uses [mathjs](https://github.com/josdejong/mathjs), [three.js](https://github.com/mrdoob/three.js/), [sprintf-js](https://github.com/alexei/sprintf.js) and [MathJax](https://github.com/mathjax/MathJax).
Licences for these can be found in `LICENCE-THIRD-PARTY`, with full copies available in the `third_party_licences` directory.

This interactive also uses example code from three.js: `TeapotBufferGeometry.js` and `Detector.js` (both modified) are stored in `static/js/third-party/threejs/`; and `three-orbit-controls` is loaded from NPM.
The former two files have a separate licence listing in `LICENCE-THIRD-PARTY` as they are modified.
All three are used under the same three.js licence.

Note that MathJax is loaded from a CDN in `base.html`.

## Images

The skybox scene used and stored in the `img` folder is the work of Emil Persson, aka Humus.
Its licence is included in the `img` folder.
