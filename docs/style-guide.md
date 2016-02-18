# Style Guide

For a large project it is important to keep consistency throughout the repository, so we have created this style guide for contributors.

## Git related

- We use [Vincent Driessen's Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/) for managing development. Please read this document to understand our branching methods (we love this structure!).
- Each feature added should developed on a new branch. The naming conventions of branches should be descriptive of the new addition/modification. Ideally they would specify their namespace as well, for example:
  - `interactive/deceiver`
  - `guide_content/data_representation`
- Commits should be as descriptive as possible. Other developers (and even future you) will thank you for your forethought and verbosity for well documented commits. See [this article](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message) for more.

## Project structure related

- Folders should have a README.md explaining the folder's contents.
- Files used should be listed in `text/en/further-information/included-files.md`.
- Folders should be all lowercase with dashes for spaces.
- Folders and files should use full words when named, however the JavaScript, CSS, and image folders within interactive folders can be named `js`, `css`, and `img` respectively.

## Programming related

These are the abridged guidelines for working on code within this repository:
- Code should be easily readable (no abbreviations etc)
- A docstring at the start of each file containing main author, and purpose.
- A comment above each function explaining it's purpose.
- Naming conventions to follow:
  - Classes should use CapitalCase (first letters capitalised, no spaces)
  - Functions should use camelCase (first letter lowercase, next words capitalised, no spaces)
  - Variables should use snake_case (all lowercase, underscores for spaces)
  - Constants should use SCREAMING_SNAKE_CASE (all uppercase, underscores for spaces)

For more detailed specifications, we aim to follow these guides:
- [HTML style guide](http://codeguide.co/#html)
- [CSS style guide](http://codeguide.co/#css)
- [JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [Python style guide](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html)
