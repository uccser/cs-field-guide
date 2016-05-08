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

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).

## Possible future plans

- Add clear button to turn all cards white.
- Add random data button that fills in cards with random values (not parity row).
- Add highlight showing parity error, however this stops opportunities for learning.
