# Computer Science Field Guide

The Computer Science Field Guide (CSFG) is an online interactive resource for high school students learning about computer science, developed at the University of Canterbury in New Zealand.
The latest HTML release of the Computer Science Field Guide can be viewed at [www.csfieldguide.org.nz](http://www.csfieldguide.org.nz/).
This repository aims to be the source for all data associated with the CSFG, and also allows users to suggest improvements or create their own version.

[Production website](https://csfieldguide.org.nz/) | [Development website](https://cs-field-guide-dev.csse.canterbury.ac.nz/)
:-: | :-:
`master` branch | `develop` branch
[![Test and deploy](https://github.com/uccser/cs-field-guide/actions/workflows/test-and-deploy.yaml/badge.svg?branch=master)](https://github.com/uccser/cs-field-guide/actions/workflows/test-and-deploy.yaml) | [![Test and deploy](https://github.com/uccser/cs-field-guide/actions/workflows/test-and-deploy.yaml/badge.svg?branch=develop)](https://github.com/uccser/cs-field-guide/actions/workflows/test-and-deploy.yaml)

## Project Philosophy

The CSFG aims to be an document used for teaching Computer Science all over the world in many different languages.
After using an internal system for creating the guide (from 2012 to 2015), we have moved to a custom open source system.
All areas of the project, from chapter text to website design, are now available for all.
We want this project to be as accessible as possible to our many user groups, which includes students, teachers and educators, and developers.

## Documentation

Documentation for this project can be found on
[ReadTheDocs](http://cs-field-guide.readthedocs.io/en/latest/),
and can also be built from the documentation source within the `docs/` directory.

## Contributing

We would love your help to make this guide the best it can be!
Please read the [documentation](http://cs-field-guide.readthedocs.io/en/latest/) to get started.

## License

The content of this project itself is licensed under the
[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) license](https://creativecommons.org/licenses/by-sa/4.0/)
(`LICENCE-CONTENT` file).
This license applies to the following contents of this project, with
exceptions listed in the `LICENCE-CONTENT` file:

- Markdown files located within the `csfieldguide/chapters/content/` directory.
- Images located within the `csfieldguide/static/img/` directory.

Third-party libraries used in this project have their licenses
listed within the `LICENCE-THIRD-PARTY` file, with a full copy of the license
available within the `third-party-licences` directory.
If a source file of a third-party library or system is stored within this
repository, then a copyright notice should be present at the top of the file.

The rest of the project, which is the underlying source code used to manage
and display this content, is licensed under the
[MIT license](https://opensource.org/licenses/MIT) (`LICENCE` file).

## Contact

You can contact us at [csse-education-research@canterbury.ac.nz](mailto:csse-education-research@canterbury.ac.nz).
