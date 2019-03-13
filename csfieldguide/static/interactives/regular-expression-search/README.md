# Regular Expression Search Interactive

**Author:** Jack Morgan

This interactive allows the user to search text with a regular expression. The interactive highlights any matches that are found.

## Usage

The interactive has several optional parameters:

1. Starting regular expression - `regex=ca?t`
2. Starting text to search - `text=Hi there everyone!` (Use `%0A` for new line characters)
3. Start with the quick reference already opened - `reference=true`

The interactive opens by default with a blank regular expression, practice text (used for first example in textbook), with the quick reference closed.

## Third Party Libraries

- [CodeMirror](https://codemirror.net/)
- [CodeMirror Regex Highlighting](https://gist.github.com/douglasduteil/5089187) - Based off the work of [douglasduteil](https://github.com/douglasduteil)

## Required Files

- This interactive uses jQuery and MaterializeCSS (loaded from base-files folder).
