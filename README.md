# Computer Science Field Guide

[![Join the chat at https://gitter.im/uccser/cs-field-guide](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/uccser/cs-field-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The Computer Science Field Guide is an online interactive resource for high school students learning about computer science, developed at the University of Canterbury in New Zealand. The latest HTML release of the Computer Science Field Guide can be viewed at [www.csfieldguide.org.nz](http://www.csfieldguide.org.nz/). This repository aims to be the source for all data associated with the CSFG, and also allows users to suggest improvements or create their own version.

## What's included

Within this repository, you will find six folders containing different areas of the source material.

- **text:** All text files for chapters and appendices, in English and other languages.
- **images:** All images used within the guide except interactives.
- **interactives:** All data associated with interactives.
- **files:** Files that are linked in the text (for example: PDFs, spreadsheets, code examples).
- **generator:** Data used to create the output of the guide.
- **output:** Output of the generator, when run by the user.

## Usage

Run `generateguide.py` with Python 3

### Optional Parameters

The following parameters may be used to alter the generation process:
- `--ignore-pip`: Bypasses the installation of dependencies using pip.
- `--pdf`: Include generation of pdf version of the field guide.

## Bugs and feature requests

Have a bug or a feature request? Please first search for [existing and closed issues](https://github.com/uccser/cs-field-guide/issues) in our issue tracker. If your problem or idea is not addressed yet, please [open a new issue](https://github.com/uccser/cs-field-guide/issues/new).

## Documentation

Complete documentation for this project will be stored in the [repository wiki](https://github.com/uccser/cs-field-guide/wiki). There are also READMEs within each folder explaining their purpose, and pointing to the corresponding wiki article.

## Contributing

We are currently still constructing this repository to produce a complete guide so will not be accepting any pull requests until v2.0 is released (v1.0 is a closed source system, the first major release on GitHub will be v2.0). After this point we would love the community to get involved into making this guide as great as possible!
A guide on how to contribute to the project (from correcting a spelling mistake to adding a translation) will be written as part of the documentation for the v2.0 release. Possible areas users will be able to contribute include:

- Suggesting a text edit for a typo, grammar correction, or just clearing up a point.
- Add a translation for a chapter or interactive.
- Add a new or replacement image for a chapter.
- Modify text and create their own version of the CSFG.
- Add or modify an interactive for the guide.

We use [Vincent Driessen's Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/) for managing development.

## Admin contact

This repository is currently maintained by [Jack Morgan](https://github.com/JackMorganNZ).

## Copyright and license

The Computer Science Field Guide uses a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license](http://creativecommons.org/licenses/by-nc-sa/4.0/). Read the [license file](LICENSE.md) for more details.
