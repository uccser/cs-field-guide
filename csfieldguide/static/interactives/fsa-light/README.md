# FSA Light Interactive

**Author:** Jack Morgan

This interactive is created for learning FSAs.

The interactive loads a configuration file to allow a user to traverse a FSA
while viewing if the light is on or off. The user should be able to draw an FSA
diagram from this. This interactive is not feature complete so will currently
not handle all FSA possibilities, however it provides all logic for the simple
example requires.

## Usage

This interactive must be loaded in either `iframe` or `whole-page` mode to load
configuration files.

To select a configuration file, pass the `config` parameter at the end of the
URL with the name of the JSON config file without the extension.

For example, adding `?config=example-1` to the end of the URL for the
`index.html` file will load the `example-1.json` file.

If no example is provided, the interactive loads `example-1.json.`

## Configuration File

The JSON config file must contain the following keys and values:

- `available_buttons`: A list of strings for button labels that can be taken
  from every state.
- `initial_state`: A string for the state label to begin from or reset to.
- `states`: A dictionary with strings for state labels, and each state requires
  the following:
  - `light`: Either the string 'On' or 'Off' to dictate if the light image.
  - `destinations`: A dictionary mapping a string of a button label to a string
    of a state label.

### Example JSON file:

```
{
  "available_buttons": ["a"],
  "initial_state": "1",
  "states": {
    "1": {
      "light": "On",
      "destinations": {
        "a": "2"
      }
    },
    "2": {
      "light": "Off",
      "destinations": {
        "a": "3"
      }
    },
    "3": {
      "light": "Off",
      "destinations": {
        "a": "1"
      }
    }
  }
}
```



## Required files

- This interactive uses MaterializeCSS, Modernizer, `iframeResizer` child file, and jQuery (all loaded from base-files folder).
