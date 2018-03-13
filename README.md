# Computer Science Field Guide

[![Build Status](https://travis-ci.org/uccser/cs-field-guide.svg?branch=master)](https://travis-ci.org/uccser/cs-field-guide)

The Computer Science Field Guide (CSFG) is an online interactive resource for high school students learning about computer science, developed at the University of Canterbury in New Zealand.
The latest HTML release of the Computer Science Field Guide can be viewed at [www.csfieldguide.org.nz](http://www.csfieldguide.org.nz/).
This repository aims to be the source for all data associated with the CSFG, and also allows users to suggest improvements or create their own version.

## Project Philosophy

The CSFG aims to be an document used for teaching Computer Science all over the world in many different languages.
After using an internal system for creating the guide (from 2012 to 2015), we have moved to a custom open source system.
All areas of the project, from chapter text to website design, are now available for all.
We want this project to be as accessible as possible to our many user groups, which includes students, teachers and educators, and developers.

## Requires

- Python 3.4+

## Installation

Download the latest release from the [GitHub releases page](https://github.com/uccser/cs-field-guide/releases), or clone the repository for the latest development version.

The required dependencies are listed within `requirements.txt` and can be installed using the Python package `pip` ([see how to do this here](https://pip.pypa.io/en/stable/user_guide/#requirements-files)), or can be manually installed to suit your environment.

## Usage

Run `generateguide.py` with Python 3.
This will produce an student version of the CSFG in English.
Details about [optional parameters are found within the usage documentation](docs/usage.md#optional-parameters).

## Bugs and feature requests

Have a bug or a feature request? Please first search for [existing and closed issues](https://github.com/uccser/cs-field-guide/issues) in our issue tracker.
If your problem or idea is not addressed yet, please [open a new issue](https://github.com/uccser/cs-field-guide/issues/new).

## Contributing

We would love your help to make this guide the best it can be! Please read our [contribution guide](CONTRIBUTING.md) to get started. Possible areas for contributions include:

- Suggesting a text edit for a typo, grammar correction, or just clearing up a point.
- Add a translation for a chapter or interactive.
- Add a new or replacement image for a chapter.
- Modify text and create their own version of the CSFG.
- Add or modify an interactive for the guide.

## Documentation

Documentation for this project is stored in the [documentation folder](docs/README.md).

## License

The Computer Science Field Guide uses a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license](http://creativecommons.org/licenses/by-nc-sa/4.0/). Read the [license file](LICENSE.md) for more details.

## Contact

This repository is currently primarily managed by [Jack Morgan](http://jackmorgannz.github.io/), with [Hayley van Waas](https://twitter.com/hayleyavw) and [Tim Bell](mailto:tim.bell@canterbury.ac.nz) as backup administrators.
