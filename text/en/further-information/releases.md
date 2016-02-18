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

### 2.0.2

**Release date:** 19th February 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/2.0.2)

**Notable changes:**
- New interactive: Parity trick with separate modes for [practicing setting parity](interactives/parity/index.html?mode=set), [practicing detecting parity](interactives/parity/index.html?mode=detect), and [the whole trick](interactives/parity/index.html). Also has a [sandbox mode](interactives/parity/index.html?mode=sandbox).
- Updated interactives: Two colour mixers, one for [RGB](interactives/rgb-mixer/index.html) and one for [CMY](interactives/cmy-mixer/index.html) have been added.
- Updated interactive: A [colour matcher interactive](interactives/colour-matcher/index.html) has been added for matching a colour in both 24 bit and 8 bit.
- Updated interactive: A [python interpreter interactive](interactives/python-interpreter/index.html) has been added for the programming languages chapter.
- Website improvements: Code blocks now have syntax highlighting when a language is specified, dropdown arrows are fixed in Mozilla Firefox browsers, and whole page interactives now have nicer link buttons.

**Changelog**:
- Added first version of parity-sandbox interactive [ba272c3](https://github.com/uccser/cs-field-guide/commit/ba272c3)
- Fixed parity-sandbox interactive size [b18a688](https://github.com/uccser/cs-field-guide/commit/b18a688)
- Modified feedback message for clarity [00d4bbc](https://github.com/uccser/cs-field-guide/commit/00d4bbc)
- Added parity interactive (set parity mode) [fa96933](https://github.com/uccser/cs-field-guide/commit/fa96933)
- Removed test.js file [6553070](https://github.com/uccser/cs-field-guide/commit/6553070)
- Added sandbox mode to parity interactive [5a204e9](https://github.com/uccser/cs-field-guide/commit/5a204e9)
- Added first stages of parity trick [7c0fc84](https://github.com/uccser/cs-field-guide/commit/7c0fc84)
- Added parity trick to parity interactive [41162cf](https://github.com/uccser/cs-field-guide/commit/41162cf)
- Changed reset text to 'Start Over' [d171802](https://github.com/uccser/cs-field-guide/commit/d171802)
- Added description text for detect stage [eda494e](https://github.com/uccser/cs-field-guide/commit/eda494e)
- Add detect only mode to parity interactive [dbe5bc9](https://github.com/uccser/cs-field-guide/commit/dbe5bc9)
- Removed wave effect from interactive buttons [ef1d1e7](https://github.com/uccser/cs-field-guide/commit/ef1d1e7)
- Shrunk feedback in parity interactive for readability [346a28f](https://github.com/uccser/cs-field-guide/commit/346a28f)
- Removed dark wave effect from buttons [de8812a](https://github.com/uccser/cs-field-guide/commit/de8812a)
- Added size control to set and trick modes [8313616](https://github.com/uccser/cs-field-guide/commit/8313616)
- Hide grid size selector during confusation stage [6d3a15d](https://github.com/uccser/cs-field-guide/commit/6d3a15d)
- Increased readability of confusation and bit borders [2b4d5de](https://github.com/uccser/cs-field-guide/commit/2b4d5de)
- Fixed links to interactives in Computer Vision chapter [51195c5](https://github.com/uccser/cs-field-guide/commit/51195c5)
- Fixed dropdown arrows in sidebar on Firefox browsers [8664951](https://github.com/uccser/cs-field-guide/commit/8664951)
- Fixed section links in curriculum guides (fixes [#205](https://github.com/uccser/cs-field-guide/issues/205)) [65936af](https://github.com/uccser/cs-field-guide/commit/65936af)
- Fixed dropdown arrows rendering incorrectly in Firefox [53002d5](https://github.com/uccser/cs-field-guide/commit/53002d5)
- Added CMY mixer interactive (fixes[ #35](https://github.com/uccser/cs-field-guide/issues/35)) [176ea4f](https://github.com/uccser/cs-field-guide/commit/176ea4f)
- Added RGB mixer interactive (fixes[ #36](https://github.com/uccser/cs-field-guide/issues/36)) [a0dadd7](https://github.com/uccser/cs-field-guide/commit/a0dadd7)
- Altered JS function within interactive to avoid conflicts [901e173](https://github.com/uccser/cs-field-guide/commit/901e173)
- Removed logging statement [cf9a2ac](https://github.com/uccser/cs-field-guide/commit/cf9a2ac)
- Added colour matcher interactive (fixes[ #38](https://github.com/uccser/cs-field-guide/issues/38)) [352b961](https://github.com/uccser/cs-field-guide/commit/352b961)
- Added link to interactive in chapter [5c2a933](https://github.com/uccser/cs-field-guide/commit/5c2a933)
- Added help/hint stages to colour-matcher [be03873](https://github.com/uccser/cs-field-guide/commit/be03873)
- Tidied colour-matcher interface [ee450d0](https://github.com/uccser/cs-field-guide/commit/ee450d0)
- Increased aesthetics of colour-matcher [20f60c0](https://github.com/uccser/cs-field-guide/commit/20f60c0)
- Added links to program downloads (fixes [#237](https://github.com/uccser/cs-field-guide/issues/237)) [0228451](https://github.com/uccser/cs-field-guide/commit/0228451)
- Added code syntax highlighting [5194ff9](https://github.com/uccser/cs-field-guide/commit/5194ff9)
- Added documentation on code syntax highlighting [7cbe9ae](https://github.com/uccser/cs-field-guide/commit/7cbe9ae)
- Fixed code type for syntax highlighting [04883ed](https://github.com/uccser/cs-field-guide/commit/04883ed)
- Added python-interpreter interactive (fixes [#196](https://github.com/uccser/cs-field-guide/issues/196)) [413008e](https://github.com/uccser/cs-field-guide/commit/413008e)
- Added syntax highlighting to code in programming languages chapter [b426d85](https://github.com/uccser/cs-field-guide/commit/b426d85)
- Remove any empty `<p></p>` tags [0de2824](https://github.com/uccser/cs-field-guide/commit/0de2824)
- Fixed labels on 8 bit sliders [b0ce415](https://github.com/uccser/cs-field-guide/commit/b0ce415)
- Make colours harder to match with 8 bits [0f90418](https://github.com/uccser/cs-field-guide/commit/0f90418)
- Added clearer help messages to colour-matcher [092b7f7](https://github.com/uccser/cs-field-guide/commit/092b7f7)
- Altered how `<pre>` blocks look on mobile devices [2459d82](https://github.com/uccser/cs-field-guide/commit/2459d82)
- Added nicer buttons to whole page interactives [ecc4137](https://github.com/uccser/cs-field-guide/commit/ecc4137)
- Updated version number for 2.0.2 [cd61d7f](https://github.com/uccser/cs-field-guide/commit/cd61d7f)
- Fixed confusing input colour in payment-interface (fixes [#109](https://github.com/uccser/cs-field-guide/issues/109)) [84d986b](https://github.com/uccser/cs-field-guide/commit/84d986b)
- Added thumbnails to whole page interactives (fixes [#227](https://github.com/uccser/cs-field-guide/issues/227)) [f5e792a](https://github.com/uccser/cs-field-guide/commit/f5e792a)
- Added manual parsing of code blocks [ba036a7](https://github.com/uccser/cs-field-guide/commit/ba036a7)
- [Linear search Python2] Code readability improvement [e9014eb](https://github.com/uccser/cs-field-guide/commit/e9014eb) - Thanks [ner0x652](https://github.com/ner0x652)
- Naming incosistency [08dfd4e](https://github.com/uccser/cs-field-guide/commit/08dfd4e) - Thanks [ner0x652](https://github.com/ner0x652)
- Remove unnecessary parenthesis. For a reader that does not know Python [97b27a4](https://github.com/uccser/cs-field-guide/commit/97b27a4) - Thanks [ner0x652](https://github.com/ner0x652)
- Added parity trick interactive to error control chapter [c986695](https://github.com/uccser/cs-field-guide/commit/c986695)
- Added thumbnail to parity interactive [3162254](https://github.com/uccser/cs-field-guide/commit/3162254)

## Older Releases

### 2.0.1

**Release date:** 12th February 2016

**Downloads:** [Source available on GitHub](https://github.com/uccser/cs-field-guide/releases/tag/2.0.1)

**Notable changes:**
- Fixed many broken links and typos from 2.0.0
- Added calculator interactives to Introduction
- Added RSA key generator to Encryption
- Rewritten Braille Section in Data Representation

**Changelog**:
- Caesar cipher interactives run in iframe (fixes [#224](https://github.com/uccser/cs-field-guide/issues/224)) [17086ee](https://github.com/uccser/cs-field-guide/commit/17086ee)
- Split calculators in introduction chapter (fixes [#228](https://github.com/uccser/cs-field-guide/issues/228)) [b858916](https://github.com/uccser/cs-field-guide/commit/b858916)
- Added rsa-jsencrypt interactive (RSA using real world library) [8983e49](https://github.com/uccser/cs-field-guide/commit/8983e49)
- Updated rsa-key-generator README [56d48fe](https://github.com/uccser/cs-field-guide/commit/56d48fe)
- Added key size option to generator [b32575e](https://github.com/uccser/cs-field-guide/commit/b32575e)
- Correct youtube link by replacing %2F with / [30ab814](https://github.com/uccser/cs-field-guide/commit/30ab814) - Thanks [ArloL](https://github.com/ArloL)
- Added RSA key generator (fixes [#16](https://github.com/uccser/cs-field-guide/issues/16)) [6a8fb42](https://github.com/uccser/cs-field-guide/commit/6a8fb42)
- Add license information for jsencrypt.js [156839f](https://github.com/uccser/cs-field-guide/commit/156839f)
- Disabled copy buttons until after key generation [770d8ea](https://github.com/uccser/cs-field-guide/commit/770d8ea)
- Added basic RSA key generation [247e5ef](https://github.com/uccser/cs-field-guide/commit/247e5ef)
- Updated rsa-key-generator to MaterializeCSS [0a685eb](https://github.com/uccser/cs-field-guide/commit/0a685eb)
- Removed debugging logs [192fb5e](https://github.com/uccser/cs-field-guide/commit/192fb5e)
- Fixed deceiver interactive not detecting odd values (fixes [#223](https://github.com/uccser/cs-field-guide/issues/223)) [b2b5aef](https://github.com/uccser/cs-field-guide/commit/b2b5aef)
- Added reset button to checksum-calculator [28549e9](https://github.com/uccser/cs-field-guide/commit/28549e9)
- Added awful-calculator to chapter (fixes [#59](https://github.com/uccser/cs-field-guide/issues/59)) [e4020a5](https://github.com/uccser/cs-field-guide/commit/e4020a5)
- Altered awful-calculator to match text description [05b9418](https://github.com/uccser/cs-field-guide/commit/05b9418)
- Fixed whitespace and character issues when viewed in page [eac58d1](https://github.com/uccser/cs-field-guide/commit/eac58d1)
- Finished working awful-calculator interactive [108ec53](https://github.com/uccser/cs-field-guide/commit/108ec53)
- Styled calculator output [c1f2360](https://github.com/uccser/cs-field-guide/commit/c1f2360)
- Updated awful-calculator CSS styling [baf27e7](https://github.com/uccser/cs-field-guide/commit/baf27e7)
- Switched multiply and divide symbols to unicode characters [d4fdcec](https://github.com/uccser/cs-field-guide/commit/d4fdcec)
- Switched awful-calcultor to MaterializeCSS [b529f3a](https://github.com/uccser/cs-field-guide/commit/b529f3a)
- Rewritten Braille Section of Data Representation [d3e6d63](https://github.com/uccser/cs-field-guide/commit/d3e6d63)
- Brooks' law adjusted [f1c3d91](https://github.com/uccser/cs-field-guide/commit/f1c3d91)
- Added SSCC to list of numbers with check digits [aa771cc](https://github.com/uccser/cs-field-guide/commit/aa771cc)
- Dynalab removed from Formal Languages chapter [b93aa45](https://github.com/uccser/cs-field-guide/commit/b93aa45)
- Fixed dead links from 2.0.0 (fixes [#216](https://github.com/uccser/cs-field-guide/issues/216)) [6bd461e](https://github.com/uccser/cs-field-guide/commit/6bd461e)
- Added details on how to escape closing brackets in link URLs [4397ac8](https://github.com/uccser/cs-field-guide/commit/4397ac8)
- Fixed comma in wrong spot within number [72bfe28](https://github.com/uccser/cs-field-guide/commit/72bfe28)

### 2.0.0

**Release date:** 5th February 2016

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
