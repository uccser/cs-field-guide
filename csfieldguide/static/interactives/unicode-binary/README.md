
## Description

This interactive displays the binary for a given character (or character by
decimal number) dynamically with different encodings.

## Usage

To use this within the Field Guide it should be used within an iframe tag (e.g. {interactive slug="unicode-binary" type="iframe" parameters="mode=utf8"}).

There is only one available parameter: `mode` which specifies the encoding type, valid values are `utf8`, `utf16` and `utf32`.

## Development

In order to make changes you will need nodejs, the source is written in CoffeeScript (don't edit the compiled JavaScript directly as it gets automatically generated).

In order to make changes run `npm install` (once ever) and make changes into the `main.coffee` file. When changes are made use `npm run build` to compile the CoffeeScript and all modules into a single JavaScript file.
