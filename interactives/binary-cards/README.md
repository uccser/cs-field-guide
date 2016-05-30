# Binary Cards Interactive

**Author:** Jack Morgan

This interactive is created to teach binary numbers, and emulates the Binary Cards CS Unplugged activity.

## Usage

The interactive shows the cards with dots from **128** to **1** by default (128, 64, 32, 16, 8, 4, 2, 1), however these can be configured by the following parameters:

- `base=value` - Where `value` is the number base to use (defaults as 2).
- `digits=value` - Where `value` is the amounts of digits to display (default is 6).
- `offset=value` - Where `value` is the amount to offset the displayed digits (default is 0). Using a positive number will show the placings from the `digits` + `offset` value, for the number of given digits. For example, using a base of `10`, digits as `3`, and offset as `2` will show the 100,000, 10,000, 1,000, and 100 placings. Using a negative number for the `value` will display floating numbers.

### Examples

- `?base=16&digits=4` - Shows the cards for the first 4 digits of base 16 (hexadecimal).
- `?digits=4&offset=-2` - Shows the cards for the 4 digits of base 2 (binary), starting with the second digit and showing the next four (the 0.5 and 0.25 places).

To use these parameters, the interactive must be used in either `whole-page` or `iframe` mode.

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).
