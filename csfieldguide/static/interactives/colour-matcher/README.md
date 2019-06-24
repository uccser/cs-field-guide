# Colour Matcher Interactive

**Author:** Jack Morgan

This interactive is created for users to learn the difference between 24 bit and 8 bit colour.
The user can perfectly match the goal colour using 24 bit values, however it's harder to match using 8 bit values.
The goal colour is picked to be impossible to match perfectly with 8 bit values.

## Usage

The interactive shows binary representation as default, but it can also display hexadecimal by adding the following URL parameter: `?hexadecimal=true`.

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

## Future Plans

- Show the colours values in a byte structure below the sliders.
- Make the instruction panels collapsible.
- Reorganise the colour panels so the current colour values only compare to the goal panel, and not each other.
