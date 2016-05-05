# Releases

This page lists the different releases to the Computer Science Field Guide.

{panel type="What numbering system do we use?"}

We base our numbering system from the guidelines at [Semantic Versioning 2.0.0](http://semver.org/spec/v2.0.0.html), however since our project started before it was migrated to GitHub, the first open source release is being labeled as 2.0.

Given a version number MAJOR.MINOR.HOTFIX:

- MAJOR version change when major text modifications are made (for example: new chapter, changing how a curriculum guide teaches a subject).
- MINOR version change when content or functionality is added or updated (for example: new videos, new activities, large number of text (typo/grammar) fixes).
- HOTFIX version change when bug hotfixes are made (for example: fixing a typo, fixing a bug in an interactive).
- A pre-release version is denoted by appending a hyphen and the alpha label followed by the pre-release version.

{panel end}

We have listed major changes for each release below.

## Pre-releases

No pre-releases currently.

## Current Release

### v2.4.1

**Release date:** 29th April 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/v2.4.1)

**Notable changes:**
- Fixed version numbering system to allow hotfix changes

A full list of changes in this version is [available on GitHub](https://github.com/uccser/cs-field-guide/compare/v2.4...v2.4.1).

## Older Releases

### v2.4

**Release date:** 29th April 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/v2.4)

**Notable changes:**
- Large number of typo, grammar, link, and math syntax fixes and also content corrections by contributors.
- New interactive: Added [GTIN-13 checksum calculator interactive](interactives/checksum-calculator-gtin-13/index.html) for calculating the last digit for a GTIN-13 barcode.
- Updated interactive: The [regular expression search interactive](interactives/regular-expression-search/index.html) has been updated and added to the repository.
- Updated interactive: The [image bit comparer interactive](interactives/image-bit-comparer/index.html) has been updated and added to the repository. It also has a [changing bits mode](interactives/image-bit-comparer/index.html?change-bits=true) which allows the user to modify the number of bits for storing each colour.
- Added XKCD mouseover text (similar behaviour to website).
- Added feedback modal to allow developers to directly post issues to GitHub.
- Added encoding for HTML entities to stop certain characters not appearing correctly in browsers.
- Added summary of output at end of generation script.
- Added message for developers to contribute in the web console.

A full list of changes in this version is [available on GitHub](https://github.com/uccser/cs-field-guide/compare/v2.3...v2.4).

### v2.3

**Release date:** 10th March 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/v2.3)

**Notable changes:**
- Readability improvements to text within many chapters (grammer issues/typos) and to the Python scripts within the Algorithms chapter.
- Updated interactive: The RSA [encryption](interactives/rsa-no-padding/index.html) and [decryption](interactives/rsa-no-padding/index.html?mode=decrypt) interactives within Encryption have been updated and added to the repository.
- Updated interactive: The [searching algorithms interactive](interactives/searching-algorithms/index.html) within Algorithms have been updated and added to the repository.
- Updated interactive: The [word filter interactive](interactives/regular-expression-filter/index.html) within Formal Languages have been updated and added to the repository.
- Updated interactives: Both the [MIPS assembler](interactives/mips-assembler/index.php) and [MIPS simulator](interactives/mips-simulator/index.php) were made open source by the original author, and we were given permission to incorporate our repository, and have been added to Programming Languages.
- A list of all interactives are now available on the [interactives page](further-information/interactives.html).

A full list of changes in this version is [available on GitHub](https://github.com/uccser/cs-field-guide/compare/v2.2...v2.3).

### v2.2

**Release date:** 19th February 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/v2.2)

**Notable changes:**
- New interactive: Parity trick with separate modes for [practicing setting parity](interactives/parity/index.html?mode=set), [practicing detecting parity](interactives/parity/index.html?mode=detect), and [the whole trick](interactives/parity/index.html). Also has a [sandbox mode](interactives/parity/index.html?mode=sandbox).
- Updated interactives: Two colour mixers, one for [RGB](interactives/rgb-mixer/index.html) and one for [CMY](interactives/cmy-mixer/index.html) have been added.
- Updated interactive: A [colour matcher interactive](interactives/colour-matcher/index.html) has been added for matching a colour in both 24 bit and 8 bit.
- Updated interactive: A [python interpreter interactive](interactives/python-interpreter/index.html) has been added for the programming languages chapter.
- Website improvements: Code blocks now have syntax highlighting when a language is specified, dropdown arrows are fixed in Mozilla Firefox browsers, and whole page interactives now have nicer link buttons.

A full list of changes in this version is [available on GitHub](https://github.com/uccser/cs-field-guide/compare/v2.1...v2.2).

### v2.1

**Release date:** 12th February 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/v2.1)

**Notable changes:**
- Fixed many broken links and typos from 2.0.0
- Added calculator interactives to Introduction
- Added RSA key generator to Encryption
- Rewritten Braille Section in Data Representation

A full list of changes in this version is [available on GitHub](https://github.com/uccser/cs-field-guide/compare/v2.0...v2.1).

### v2.0

**Release date:** 5th February 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/v2.0)

**Notable changes:**
- First open source release
- Produces both student and teacher versions
- Produces landing page for selecting language
- Added new NCEA curriculum guides on Encryption and Human Computer Interaction

A full list of changes in this version is [available on GitHub](https://github.com/uccser/cs-field-guide/compare/v2.0-alpha.3...v2.0).

**Comments:**
The first major step in releasing a open source version of the Computer Science Field Guide.
While some content (most notably interactives) have yet to be added to the new system, we are releasing this update for New Zealand teachers to use at the beginning of their academic year.
For any interactives that are missing, links are in place to the older interactives.

### v2.0-alpha.3

**Release date:** 29th January 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/compare/d8a69d50575cac8c4e2686ee4d9af7c22b7131a7...v2.0-alpha.3)

### v2.0-alpha.2

**Release date:** 25th January 2016

### v2.0-alpha.1

**Release date:** 2nd December 2015

**Comments:**
Released at CS4HS 2015.

### 1.?.?

**Release date:** 3rd February 2015

**Comments:**
The last version of the CSFG before the open source version was adopted.

[This release is archived for viewing here](http://www.csfieldguide.org.nz/releases/1.9.9/).

{version-specific-content version="teacher"}
[The teacher version is archived for viewing here](http://www.csfieldguide.org.nz/releases/1.9.9/teacher/).
{version-specific-content end}
