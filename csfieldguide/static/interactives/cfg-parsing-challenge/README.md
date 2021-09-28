# CFG Parsing Challenge Interactive

**Author:** Alasdair Smith  
**Modified by:** Jack Morgan, Alasdair Smith

This interactive demonstrates a context-free grammar (CFG) by allowing a user to use it to build a mathematical equation (default behaviour) or sentences.
The user can also obtain a link to the interactive with their own productions through a simple interface.
The interactive can demonstrate most grammars via URL parameters.

## URL Parameters

This interactive can be configured by appending various parameters to the default URL.
To do this, add a question mark (`?`) after the last `/` in the URL, then each parameter separated by ampersands (`&`).
For this interactive, each parameter is in the form `keyword=value`, where each `keyword` is an option to be changed and `value` is what that option should be set to.
For example:

- The URL `[...]/cfg-parsing-challenge/` could be changed to `[...]/cfg-parsing-challenge/?hide-generator=true&examples=1+1|2+3+4`

**Note**: It is recommended that parameter values have all non-unreserved characters [percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding).

### Parameters

- `editable-target=[true|false] (default: false)`: If `true`, allow the target equation field to be edited.
- `hide-builder=[true|false] (default: false)`: If `true`, hide the button that would allow the user to set their own productions.
- `examples=str|str|str|...`: Enable the `Next` option, and set the examples that can be selected by it.
Examples will be cycled through in the order given.
- `productions=str`: Set the grammar productions that can be used.
An example of the correct syntax using the default grammar can be found below.
  - When setting your own productions, it is recommended that you also use either the `recursion-depth` or `hide-generator` parameters.

The built-in equation generator works by following productions at random from the initial non-terminal - essentially building a parse tree - until there are no non-terminals left in the equation.
In certain grammars, the parse tree could continue indefinitely, so the generator is forced to stop a certain number of branches down the tree:

- `hide-generator=[true|false] (default: false)`: If `true`, disable the built-in equation generator (options `Random` & `Simple`).
- `recursion-depth=int (default: 5)`: Set the maximum depth of the parse tree for the built-in equation generator (`Random`).
If this is set then the option to generate with depth 3 (`Simple`) is removed.
After 100 tries the generator will quit with an error message.

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

`url/?productions=E:N|E '+' E|E '*' E|'-' E|'(' E ')';N:'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';`

With percent encoding:

`url/?productions=E%3aN%7cE%20%27%2b%27%20E%7cE%20%27%2a%27%20E%7c%27-%27%20E%7c%27%28%27%20E%20%27%29%27%3bN%3a%270%27%7c%271%27%7c%272%27%7c%273%27%7c%274%27%7c%275%27%7c%276%27%7c%277%27%7c%278%27%7c%279%27%3b`

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
