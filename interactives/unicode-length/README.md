# Unicode Length Interactive
## Description

This interactive displays the length (in bits) of text encoded using different encodings.

## Usage

To use this within the Field Guide it should be used within an interactive wrapper (e.g. `{interactive name="unicode-length" type="iframe"}`).

## Development

In order to make changes you will need nodejs, the source is written in CoffeeScript (don't edit the compiled JavaScript directly as it gets automatically generated).

In order to make changes run `npm install` (once ever) and make changes into the `main.coffee` file. When changes are made use `npm run build` to compile the CoffeeScript and all modules into a single JavaScript file.
