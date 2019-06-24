# FSA Box Interactive

**Author:** Jack Morgan

This interactive is created for learning FSAs.

The interactive loads a configuration file to allow a user to traverse a FSA
while viewing if the current state is accepted or not. The user should be able
to draw an FSA diagram from this.

This interactive is not feature complete so will currently not handle all FSA possibilities, however it provides all logic for the simple base examples.

## Usage

This interactive must be loaded in either `iframe` or `whole-page` mode to load
configuration text.

Such text is in the JS dictionary format with Django logic, stored within `fsa-box.html`.

To select a configuration, pass the `config` parameter at the end of the
URL with the name of the config.

For example, adding `?config=example-1` to the end of the URL will load the `example-1` text.

If no example is provided, the interactive loads `example-1`.

## Configuration text

The configuration text must contain the following keys and values:

- `available_buttons`: A list of strings for button labels that can be taken
  from every state.
- `initial_state`: A string for the state label to begin from or reset to.
- `states`: A dictionary with strings for state labels, and each state requires
  the following:
  - `box`: Either the string 'Accepted' or 'Not accepted' to dictate if the
    state is accepted or not.
  - `destinations`: A dictionary mapping a string of a button label to a string
    of a state label.

### Example config text:

```
{
  "available_buttons": ["a", "b"],
  "initial_state": "1",
  "states": {
    "1": {
      "box": "Not accepted",
      "destinations": {
        "a": "2",
        "b": "1"
      }
    },
    "2": {
      "box": "Accepted",
      "destinations": {
        "a": "2",
        "b": "1"
      }
    }
  }
}
```
