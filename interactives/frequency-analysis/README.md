# Frequency Analysis Interactive

## Description

This interactive displays a bar chart of counts of specific characters within a piece of text for in understanding frequency analysis attacks.

## Usage

To use this within the Field Guide it should be used within an iframe tag (e.g. `{interactive name="frequency-analysis" type="iframe"}`).

## Development

In order to make changes you will need nodejs, the source is written in CoffeeScript (don't edit the compiled JavaScript directly as it gets automatically generated).

In order to make changes run `npm install` (once ever) and make changes into the `main.coffee` file. When changes are made use `npm run build` to compile the CoffeeScript and all modules into a single JavaScript file.
