# Computer Science Field Guide

The Computer Science Field Guide (CSFG) is an online interactive resource for high school students learning about computer science, developed at the University of Canterbury in New Zealand.
The latest HTML release of the Computer Science Field Guide can be viewed at [www.csfieldguide.org.nz](http://www.csfieldguide.org.nz/).
This repository aims to be the source for all data associated with the CSFG, and also allows users to suggest improvements or create their own version.

## Project Philosophy

The CSFG aims to be an document used for teaching Computer Science all over the world in many different languages.
After using an internal system for creating the guide (from 2012 to 2015), we have moved to a custom open source system.
All areas of the project, from chapter text to website design, are now available for all.
We want this project to be as accessible as possible to our many user groups, which includes students, teachers and educators, and developers.

## What's included

Within this repository, you will find the following folders:

- **text:** All text files for chapters, curriculum guides, and extra pages, in English and other languages.
- **images:** All images used within the guide, except those used in interactives.
- **interactives:** All data associated with interactives.
- **files:** Files that are downloaded from the text (for example: PDFs, spreadsheets, code examples).
- **generator:** Data used to create the output of the guide.
- **output:** Contains the output files of the generator, when run by the user.
- **docs:** Contains the documentation about this repository.

## Requires

- Python 3.4+

## Installation

Download the latest release from the [GitHub releases page](https://github.com/uccser/cs-field-guide/releases), or clone the repository for the latest development version.

The required dependencies are listed within `requirements.txt` and can be installed using the Python package `pip` ([see how to do this here](https://pip.pypa.io/en/stable/user_guide/#requirements-files)), or can be manually installed to suit your environment.

## Usage

Run `generateguide.py` with Python 3.
This will produce an student version of the CSFG in English.

#### Optional Parameters

The following parameters may be used to alter the generation process:
- `--language` or `-l` followed by language codes: Outputs in the given languages
- `--teacher` or `-t`: Outputs both student and teacher versions of the CSFG

For example: Running `python generateguide.py --language en de fr -t` will produce the CSFG in English, German, and French with teacher versions included.

## Bugs and feature requests

Have a bug or a feature request? Please first search for [existing and closed issues](https://github.com/uccser/cs-field-guide/issues) in our issue tracker.
If your problem or idea is not addressed yet, please [open a new issue](https://github.com/uccser/cs-field-guide/issues/new).

## Documentation

Complete documentation for this project is stored in the [docs folder](docs/).

## Contributing

We would love your help to make this guide the best it can be!

A guide on how to contribute to the project (from correcting a spelling mistake to adding a translation) will be available soon.
Possible areas users will be able to contribute include:

- Suggesting a text edit for a typo, grammar correction, or just clearing up a point.
- Add a translation for a chapter or interactive.
- Add a new or replacement image for a chapter.
- Modify text and create their own version of the CSFG.
- Add or modify an interactive for the guide.

We use [Vincent Driessen's Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/) for managing development.

## License

The Computer Science Field Guide uses a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license](http://creativecommons.org/licenses/by-nc-sa/4.0/). Read the [license file](LICENSE.md) for more details.

## Contact

This repository is currently managed by [Jack Morgan](https://github.com/JackMorganNZ).
