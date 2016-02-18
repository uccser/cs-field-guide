# Computer Science Field Guide

The Computer Science Field Guide (CSFG) is an online interactive resource for high school students learning about computer science, developed at the University of Canterbury in New Zealand. The latest HTML release of the Computer Science Field Guide can be viewed at [www.csfieldguide.org.nz](http://www.csfieldguide.org.nz/). This repository aims to be the source for all data associated with the CSFG, and also allows users to suggest improvements or create their own version.

## Project Philosophy

The CSFG aims to be an document used for teaching Computer Science all over the world in many different languages. After using an internal system for creating the guide (from 2012 to 2015), we have moved to a custom build and open source system. All areas of the project, from chapter text to website design, are now available for all.

We want this project to be as accessible as possible to our many user groups, which includes students, teachers and educators, and developers. We aim to simplify the experience of creating your guide by requiring no external dependencies (other than Python 3) for websites, and easy guides and tools for contributing text changes.

## What's included

Within this repository, you will find the following folders:

- **text:** All text files for chapters, curriculum guides, and extra pages, in English and other languages.
- **images:** All images used within the guide, except those used in interactives.
- **interactives:** All data associated with interactives.
- **files:** Files that are downloaded from the text (for example: PDFs, spreadsheets, code examples).
- **generator:** Data used to create the output of the guide.
- **output:** Contains the output files of the generator, when run by the user.
- **docs:** Contains the documentation about this repository.

## Installation and Usage

Download the latest release from the [GitHub releases page](https://github.com/uccser/cs-field-guide/releases). Run `generateguide.py` with Python 3 (which from the command line is `python generateguide.py`).

This will produce an student version of the CSFG in English.

### Optional Parameters

The following parameters may be used to alter the generation process:
- `--language` or `-l` followed by language codes: Outputs in the given languages
- `--teacher` or `-t`: Outputs both student and teacher versions of the CSFG
- `--ignore-pip` or `-i`: Bypasses the installation of dependencies using pip
- `--pdf` or `-p`: Include generation of pdf version of the CSFG

For example: Entering `python generateguide.py --language en de fr -t` will produce the CSFG in English, German, and French with teacher versions included.

## Bugs and feature requests

Have a bug or a feature request? Please first search for [existing and closed issues](https://github.com/uccser/cs-field-guide/issues) in our issue tracker. If your problem or idea is not addressed yet, please [open a new issue](https://github.com/uccser/cs-field-guide/issues/new).

## Contributing

For those willing to contribute to the project, check out the [project documentation](docs/README.md) for more information.

## Admin contact

This repository is currently maintained by [Jack Morgan](https://github.com/JackMorganNZ).

## Copyright and license

The Computer Science Field Guide uses a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license](http://creativecommons.org/licenses/by-nc-sa/4.0/). Read the [license file](LICENSE.md) for more details.
