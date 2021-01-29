# CFG Equation Builder Interactive

**Author:** Alasdair Smith

This interactive demonstrates a context-free grammar (CFG) by allowing a user to use it to build a mathematical equation.

## URL Parameters

**It is recommended that parameters have all non-unreserved characters [percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding).**

### Basic Parameters

- `productions=str`: Set the grammar productions that can be used. Lone integers, as well as strings beginning and ending with an inverted comma, are interpreted as terminals. An example of the correct syntax using the default grammar can be found below.
- `examples=str|str|str|...`: Set the examples that can be selected by the `From preset` generator option. Examples will be cycled through in the order given. If grammar productions are set and this is not, then the option (`From preset`) is removed.
- `hide-generator=[true|false] (default: false)`: If `true`, removes the built-in equation generator (`Simple` & `Random`).

### Advanced Parameters

These parameters allow more control over the built-in equation generator.
The defaults work well for the default productions, but in most situations it is recommended that `recursion-depth` is set higher than the default and `retry-if-fail` is set to `true`.

- `recursion-depth=int (default: 3)`: Set the maximum recursion depth for the built-in equation generator (`Random`). If this or `retry-if-fail` is set then the option to generate with depth 1 (`Simple`) is removed.
- `retry-if-fail=[true|false] (default: false)`: If `true`, the built-in equation generator will restart if it reaches the maximum recursion depth but nonterminals remain in the equation. After 10 tries the generator will quit with an error message. Otherwise if the generator reaches the maximum depth, it will replace all remaining nonterminals with random terminals from `terminals`, even if such replacements aren't valid.
- `terminals=str|str|str|... (default: 0-9)`: Set the terminals that can be selected from by the built-in equation generator if the maximum recursion depth is reached. If `retry-if-fail` is `true` then this parameter will have no effect.

### URL Parameter Limitations

- If a production replaces a nonterminal with one integer, that integer will
be interpreted as a terminal with or without the inverted commas.
This allows a shorthand syntax where the inverted commas and spaces can be left out.
- Parameter syntax characters, including spaces and (`:`,`'`,`|`,`;`), are always interpreted as such,
so problems will occur if they are attempted to be used as part of the grammar productions.

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

When used as a URL parameter, including the shorthand for lone integers:

`url?productions=E : N | E '+' E | E '*' E | '-' E | '(' E ')' ; N : 0|1|2|3|4|5|6|7|8|9;`

With percent encoding:

`url?productions=E%20%3a%20N%20%7c%20E%20%27%2b%27%20E%20%7c%20E%20%27%2a%27%20E%20%7c%20%27-%27%20E%20%7c%20%27%28%27%20E%20%27%29%27%20%3b%20N%20%3a%200%7c1%7c2%7c3%7c4%7c5%7c6%7c7%7c8%7c9%3b`

## Required files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
