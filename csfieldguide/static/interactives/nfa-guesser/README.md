# NSA Guesser

**Author:** Jack Morgan

This interactive is created for practice traversing a NSA.

The interactive displays a NFA map and randomly creates a input sequence that
has at least two resulting states. The user must select all valid states for
the given sequence.

The NFA Diagram was created at http://madebyevan.com/fsm/, then cropped using
[Inkscape](https://inkscape.org/en/) and optimised using [SVGo](https://github.com/svg/svgo).

## Usage

This interactive does not use configuration files so can be run in any interactive mode.

## Required files

- The interactive uses the `fsa.js` file from the `fsa` interactive folder.
- The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
    - See `static/js/website.js` for a full list.
