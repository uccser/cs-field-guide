# Delayed Checkbox Interactive

**Author:** Jack Morgan

This interactive is created for the HCI chapter in testing user delays. The user must tick the checkbox, but the checkbox has a 1.5 second delay so often the user selects multiple times.

## Required Files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

## Known issues

- On some browsers the checkbox renders normal size (our CSS increases the box from the default size). The smaller checkbox is deemed fine currently.
