# FSA Light Interactive

**Author:** Jack Morgan

This interactive is created for learning FSAs.

The interactive loads a configuration which allows a user to traverse an FSA
while viewing if the light is on or off. The user should be able to draw an FSA
diagram from this. This interactive is not feature complete so will currently
not handle all FSA possibilities, however it provides all logic for the simple
examples.

## Usage

This interactive must be loaded in either `iframe` or `whole-page` mode to load
configurations.

Such configs are in the JS dictionary format, stored within `fsa-light.html`.
Use Django logic to separate them, such as in `fsa-box.html`.

To select a configuration, pass the `config` parameter at the end of the
URL with the name of the config.

For example, adding `?config=example-1` to the end of the URL will load the `example-1` settings.

`example-1` is the only configuration currently available.
The interactive only loads `example-1`.

## Configuration

The configuration must contain the following keys and values:

- `available_buttons`: A list of strings for button labels that can be taken
  from every state.
- `initial_state`: A string for the state label to begin from or reset to.
- `states`: A dictionary with strings for state labels, and each state requires
  the following:
  - `light`: Either the string 'On' or 'Off' to dictate if the light image.
  - `destinations`: A dictionary mapping a string of a button label to a string
    of a state label.

### Example configuration:

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
