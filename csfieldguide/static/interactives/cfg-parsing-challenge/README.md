# CFG Parsing Challenge Interactive

**Author:** Alasdair Smith

This interactive demonstrates a context-free grammar (CFG) by allowing a user to use it to build a mathematical equation (default behaviour) or sentences.
The user can also obtain a link to the interactive with their own productions through a simple interface.
The interactive can demonstrate most grammars via URL parameters.

## URL Parameters

**It is recommended that parameters have all non-unreserved characters [percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding).**

### Basic Parameters

- `hide-builder=[true|false]`: If `true`, hides the button that would allow the user to set their own productions.
- `hide-generator=[true|false] (default: false)`: If `true`, disable the built-in equation generator (options `Random` & `Simple`).
- `examples=str|str|str|...`: Set the examples that can be selected by the `Next` generator option.
Examples will be cycled through in the order given.
- `productions=str`: Set the grammar productions that can be used.
An example of the correct syntax using the default grammar can be found below.
  - The built-in equation generator is configured as it is because it works well with the default productions.
  When setting your own productions, it is highly recommended that you investigate the Advanced Parameters section of this README, or to disable the generator entirely using the `hide-generator` parameter.

### Advanced Parameters

These parameters allow more control over the built-in equation generator.
The defaults work well for the default productions, but in most situations it is recommended that `recursion-depth` is set higher than the default and `retry-if-fail` is set to `true`.

- `recursion-depth=int (default: 3)`: Set the maximum recursion depth for the built-in equation generator (`Random`).
If this or `retry-if-fail` is set then the option to generate with depth 1 (`Simple`) is removed.
- `retry-if-fail=[true|false] (default: false)`:
  - If `true`, the built-in equation generator will restart if it reaches the maximum recursion depth with non-terminals remaining in the equation.
After 10 tries the generator will quit with an error message.
  - If `false`, once the generator reaches the maximum depth, it will replace all remaining non-terminals with random terminals from `terminals`, **even if such replacements aren't valid**.
- `terminals=str|str|str|... (default: 0-9)`: Set the terminals that can be selected from by the built-in equation generator if the maximum recursion depth is reached.
If `retry-if-fail` is `true` then this parameter will have no effect.

### URL Parameter Limitations

- Production-defining syntax characters, including spaces and (`:`,`'`,`|`,`;`), are always interpreted as such, so problems will occur if they are attempted to be used as part of the grammar productions.
- URL parameter syntax characters, including ampersands (`&`) and equals (`=`) will also cause problems if used in grammar productions.

### URL Productions Example

Example of simplified YACC syntax that can be submitted as grammar productions:

```text
E
  : N
  | E '+' E
  | E '*' E
  | '-' E
  | '(' E ')'
  ;
D
  : '0'
  | '1'
  | ...
  | '9'
  ;
```

When used as a URL parameter:

`url?productions=E:N|E '+' E|E '*' E|'-' E|'(' E ')';N:'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';`

With percent encoding:

`url?productions=E%3aN%7cE%20%27%2b%27%20E%7cE%20%27%2a%27%20E%7c%27-%27%20E%7c%27%28%27%20E%20%27%29%27%3bN%3a%270%27%7c%271%27%7c%272%27%7c%273%27%7c%274%27%7c%275%27%7c%276%27%7c%277%27%7c%278%27%7c%279%27%3b`

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
