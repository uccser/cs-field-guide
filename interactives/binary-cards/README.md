# Binary Cards Interactive

**Author:** Jack Morgan

This interactive is created to teach binary numbers, and emulates the Binary Cards CS Unplugged activity.

## Usage

The interactive shows the cards with dots from **128** to **1** by default (128, 64, 32, 16, 8, 4, 2, 1), however these can be configured by the following parameters:

- `high=num` - Where `num` is given as a number (whole or decimal) the cards will start counting from this number and every following card will be half of the previous.
- `low=num` - Where `num` is given as a number (whole or decimal) the cards will stop displaying after they pass this number.

For example: Adding `?high=4096&low=1024` at the end of the URL will show the cards 4096, 2048, and 1024, Adding `?high=0.5&low=0.125` will show the cards for 1/2, 1/4, and 1/8.

To use these parameters, the interactive must be used in either `whole-page` or `iframe` mode.

## Required files

- This interactive uses MaterializeCSS, Modernizer, and jQuery (all loaded from base-files folder).
