# Run Length Encoding Interactive

**Original Author:** Hannah Taylor  
**Modified By:** Jack Morgan, Alasdair Smith

This interactive is created for showing users how basic images can be stored with the run length encoding compression method.
Encoding numbers should be separated with commas (and spaces if desired) and each row on a new line.

The original code was provided by Hannah Taylor with permission given to use in the CSFG. The existing program has been modified to fit the new CSFG requirements (responsive design, etc).

## URL Parameters

- `grid-size= (default: 5)` Sets the initial grid size.
- `encoding= (default: 5%0A5%0A5%0A5%0A5 (i.e. 5 rows of '5'))` Sets the initial encoding to be displayed.

## Required Files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

## Possible future Plans

- Allow last digit to be missing. For example, in a grid 5 wide, the numbers '2, 1' would signify 2 white, then 1 black, then the rest white.
- More complex CSS theme.
- Write instructions panel.
- Allow rectangular grids, rather than just squares.
