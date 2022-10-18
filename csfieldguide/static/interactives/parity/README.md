# Parity Interactive

**Author:** Jack Morgan

This interactive is created as an environment for learning parity.

## Usage

The interactive has several modes:

1. Setting Parity - `mode=set`
2. Detecting Errors - `mode=detect`
3. Sandbox - `mode=sandbox`
4. Parity Trick (starts in mode 1, then switches 1 bit, then moves to mode 2)

The interactive opens by default in Parity Trick mode.

To access a different mode, the parameter `mode` must be passed with the value list above (for example: Accessing the sandbox mode is done by adding `?mode=sandbox` to the end of the URL).

The following URL parameters can be added to configure how the interactive is loaded:

- `grid-size=X` can preset the grid size where `X` is an integer between 2 and 20.
- `hide-size-controls` will hide the grid size option.
- `show-grid-references` will show the grid references on load.
- `initial-bits=VALUES` can preset the initial bits (not including parity bits), where `VALUES` is a string of `W`s and `B`s to signify white and black squares respectively, left to right, top to bottom.
  For example, if you had a grid that is 4 by 4 bits, and you wanted to preset the rows of alternating white and black, `VALUES` would be `WWWBBBWWW` (as parity bits are skipped).

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
