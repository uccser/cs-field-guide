# SHA2 Interactive

## Description

This interactive creates a digest using SHA2.

## Usage

To use this within the Field Guide it should be used in an interactive tag (e.g. `{interactive name="sha2" type="iframe"}`).

## Development

In order to make changes you will need nodejs, the source is written in CoffeeScript (don't edit the compiled JavaScript directly as it gets automatically generated).

In order to make changes run `npm install` (once ever) and make changes into the `main.coffee` file. When changes are made use `npm run build` to compile the CoffeeScript and all modules into a single JavaScript file.
