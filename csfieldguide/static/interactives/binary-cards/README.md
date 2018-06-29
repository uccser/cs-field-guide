# Binary Cards Interactive

**Author:** Jack Morgan

This interactive is created to teach binary numbers, and emulates the Binary Cards CS Unplugged activity.

## Usage

The interactive shows the cards with dots from **128** to **1** by default (128, 64, 32, 16, 8, 4, 2, 1), however these can be configured by the following parameters:

- `base=value` - Where `value` is the number base to use (defaults as 2).
- `digits=value` - Where `value` is the amounts of digits to display (default is 6).
- `offset=value` - Where `value` is the amount to offset the displayed digits (default is 0). Using a positive number will show the placings from the `digits` + `offset` value, for the number of given digits. For example, using a base of `10`, digits as `3`, and offset as `2` will show the 100,000, 10,000, 1,000, and 100 placings. Using a negative number for the `value` will display floating numbers.
- `start=sides` - Where `sides` is a sequence of `W` and `B` characters, to state the sides that should be displayed when the interactive starts. The first letter states whether the first card (on the left) should be white (`W`) or black (`B`), the second letter stands for the second card. Therefore the number of letters should match the number of digits used.

### Examples

- `?base=16&digits=4` - Shows 6 (default) cards for the first 4 digits of base 16 (hexadecimal).
- `?digits=4&offset=-2` - Shows 5 cards for the 4 digits of base 2 (binary), starting with the second digit and showing the next four (the 0.5 and 0.25 places).
- `?digits=5&start=BBBBB` - Shows 5 cards for the 5 digits of base 2 (binary), with all sides showing black to start.

To use these parameters, the interactive must be used in either `whole-page` or `iframe` mode.

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).
