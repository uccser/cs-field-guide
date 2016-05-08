## Description

This interactive encrypts and decrypts using the Caesar Cipher.

## Usage

To use this within the Field Guide it should be use an interactive tag (e.g. `{interactive name="caesar-cipher" type="iframe"}`).


## Development

In order to make changes you will need nodejs, the source is written in CoffeeScript (don't edit the compiled JavaScript directly as it gets automatically generated).

In order to make changes run `npm install` (once per computer) and make changes into the `caesar.coffee` file. When changes are made use `npm run build` to compile the CoffeeScript and all modules into a single JavaScript file.
