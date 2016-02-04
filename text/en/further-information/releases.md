# Releases

This page lists the different releases to the Computer Science Field Guide.

{panel type="What numbering system do we use?"}

We base our numbering system from the guidelines at [Semantic Versioning 2.0.0](http://semver.org/spec/v2.0.0.html), however since our project started before it was migrated to GitHub, the first open source release is being labelled as 2.0.

Given a version number MAJOR.MINOR.PATCH:

- MAJOR version change when major text modifications are made (for example: new chapter, changing how a curriculum guide teaches a subject)
- MINOR version change when new content or new functionality is added (for example: new videos, new activities)
- PATCH version change when bug fixes are made (for example: fixing typos, errors in interactives)
- A pre-release version is denoted by appending a hyphen and the alpha label followed by the patch version.

{panel end}

We have listed major changes for each release below.

## Pre-releases

No pre-releases currently.

## Current Release

### 2.0.0

**Release date:** 4th February 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/2.0.0)

**Notable changes:**
- First open source release
- Produces both student and teacher versions
- Produces landing page for selecting language
- Added new NCEA curriculum guides on Encryption and Human Computer Interaction

**Changelog**:
- Modified process of creating CSFG versions [cffc973](https://github.com/uccser/cs-field-guide/commit/cffc973d95e5b144fad259e1877fe7e7567ed957)
- Added link to student page from teacher pages [49531ac](https://github.com/uccser/cs-field-guide/commit/49531ac12e8875122d7ddacea1821a0507a911af)
- Only display teacher panels in teacher version [345b25d](https://github.com/uccser/cs-field-guide/commit/345b25d2937643ba2d4c8d1cea9596136be6023f)
- Add link to teacher version (fixes [#206](https://github.com/uccser/cs-field-guide/issues/206)) [b99fe5a](https://github.com/uccser/cs-field-guide/commit/b99fe5a57a19e23bb9abe68696e14f1056bba2d5)
- Display teacher version in sidebar (fixes [#207](https://github.com/uccser/cs-field-guide/issues/207)) [2fd95c1](https://github.com/uccser/cs-field-guide/commit/2fd95c160562360f0c939bea237097db7c6a9896)
- Added teacher subtitle to homepage (fixes [#207](https://github.com/uccser/cs-field-guide/issues/207)) [667bf67](https://github.com/uccser/cs-field-guide/commit/667bf67565c8cb5267573dc26d319d92b119befe)
- Added link to CSFG teachers group [f8a9629](https://github.com/uccser/cs-field-guide/commit/f8a9629)
- Draft for Encryption guide for NCEA (RSA) [ff05e51](https://github.com/uccser/cs-field-guide/commit/ff05e51ca473ade78d195cdad95ff963387da62c)
- Added license and sources to xkcd comics (fixes [#200](https://github.com/uccser/cs-field-guide/issues/200)) [441feec](https://github.com/uccser/cs-field-guide/commit/441feec5ffeb9ab697fc0159e37113bb2f9a4111)
- Added site search by custom google search (fixes [#191](https://github.com/uccser/cs-field-guide/issues/191)) [c520fd7](https://github.com/uccser/cs-field-guide/commit/c520fd752f0e6047ffd228c7ac74d55307bc6b32)
- Altered dot-combinations image to shrink vertically [b38260b](https://github.com/uccser/cs-field-guide/commit/b38260b25a333f508cbfe0aac7ad0a0cd1e0b5a6)
- Tidied code regarding panels	[a38a55b](https://github.com/uccser/cs-field-guide/commit/a38a55b4dc4574574e74a9e6e37f1b3c6a71a92f)
- Minor wording fixes to NCEA TSP assessment guide [3cabead](https://github.com/uccser/cs-field-guide/commit/3cabead8eb6358c41e9da88f77ec2f2b7816ab5c)
- Added custom colour scheme for teacher version [da1e63c](https://github.com/uccser/cs-field-guide/commit/da1e63c26592a3b0b43455785841c3c46d057547)
- Updated teacher panels to match colour scheme [872e058](https://github.com/uccser/cs-field-guide/commit/872e058b2897942e1842f129462abf15178f32e6)
- Modified version variable to store string in lower case [fc49335](https://github.com/uccser/cs-field-guide/commit/fc49335)
- Added documentation for `conditional` tag [5293d7e](https://github.com/uccser/cs-field-guide/commit/5293d7e)
- Expanded version and conditional content tag names for readability [24995d8](https://github.com/uccser/cs-field-guide/commit/24995d8)
- Modified size of embedded videos [5fd3a9c](https://github.com/uccser/cs-field-guide/commit/5fd3a9c18b3caed61b752692018e88704171dddc)
- Data Representation: Fixed broken syntax and add links to interactives [43e7b6a](https://github.com/uccser/cs-field-guide/commit/43e7b6a)
- Modified links to old CSFG to use correct link [aece47c](https://github.com/uccser/cs-field-guide/commit/aece47c)
- Made landing page easier to read [89bd95b](https://github.com/uccser/cs-field-guide/commit/89bd95b)
- Added useful links to 404 page [1038919](https://github.com/uccser/cs-field-guide/commit/1038919d86ee489bd3c6db7b3532fac2896f8d79)
- Added link to calculator interactive and fixed button spacing [76b8d8f](https://github.com/uccser/cs-field-guide/commit/76b8d8f)
- Added info text to section landing pages (fixes [#212](https://github.com/uccser/cs-field-guide/issues/212)) [2cfc5e2](https://github.com/uccser/cs-field-guide/commit/2cfc5e2)
- Added footer information to landing page (fixes [#210](https://github.com/uccser/cs-field-guide/issues/210)) [1b16d36](https://github.com/uccser/cs-field-guide/commit/1b16d36)
- Added Achieved guide for NCEA 2.44 HCI [493761c](https://github.com/uccser/cs-field-guide/commit/493761c)
- Removed level 2 guides which do not satisfy 2.44 [5ffd8e4](https://github.com/uccser/cs-field-guide/commit/5ffd8e4)
- Clarified release process in regards to pull requests [8816da5](https://github.com/uccser/cs-field-guide/commit/8816da5)
- Added homepage button animation [99a4e6b](https://github.com/uccser/cs-field-guide/commit/99a4e6b)
- Added documentation about release process [4869bfb](https://github.com/uccser/cs-field-guide/commit/4869bfb)
- Resized buttons on landing page [b10ba16](https://github.com/uccser/cs-field-guide/commit/b10ba168a0e4b8e699daeebe5d1f1fec2008398c)

**Comments:**
The first major step in releasing a open source version of the Computer Science Field Guide.
While some content (most notably interactives) have yet to be added to the new system, we are releasing this update for New Zealand teachers to use at the beginning of their academic year.
For any interactives that are missing, links are in place to the older interactives.

## Older Releases

### 2.0.0-alpha.3

**Release date:** 29th January 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/2.0.0-alpha.3)

**Changelog**:
- Added Software Engineering curriculum guide [98e13bb](https://github.com/uccser/cs-field-guide/commit/98e13bbcb6327b948cb57e01e1c0699d108feda7)
- Added Formal Languages curriculum guide [ad8441e](https://github.com/uccser/cs-field-guide/commit/ad8441ed13b2ec4d7c57cff512663104229d7d9a)
- Added Complexity and Tractability curriculum guide [d603f52](https://github.com/uccser/cs-field-guide/commit/d603f52f1d4a8076eb0cbc2ca2c27e1f2834749b)
- Added list of contributors [f0c235e](https://github.com/uccser/cs-field-guide/commit/f0c235efcab571e882c02dc482c52d11811e1ea9)
- Added text around Computer Graphics interactives [099fb86](https://github.com/uccser/cs-field-guide/commit/099fb86fad205baf01890f6506872920573c0103)
- Added releases page for versioning [055783f](https://github.com/uccser/cs-field-guide/commit/055783f59ee098b69c13fa71a808e7580cf2d49d)
- Added version number to the footer [64f40ac](https://github.com/uccser/cs-field-guide/commit/64f40ac0a02281107ed5354f51d06c196c12bbeb)
- Added additional information panel colour [1148528](https://github.com/uccser/cs-field-guide/commit/1148528c6edfb076e62e097ba0671eadd63fb69f)
- Add automatic pre-release warning if version number contains alpha [95a93a1](https://github.com/uccser/cs-field-guide/commit/95a93a1a389d6b96d67227d996c064dcaeba16cd)

### 2.0.0-alpha.2

**Release date:** 25th January 2016

### 2.0.0-alpha.1

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
