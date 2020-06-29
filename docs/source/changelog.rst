Changelog
##############################################################################

This page lists updates to the Computer Science Field Guide.
All notable changes to this project will be documented in this file.

.. note ::

  We base our numbering system from the guidelines at `Semantic Versioning 2.0.0 <http://semver.org/spec/v2.0.0.html>`__, however since our project started before it was migrated to GitHub, the first open source release is being labeled as `2.0.0`.

  Given a version number MAJOR.MINOR.HOTFIX:

  - MAJOR version change when system-wide modifications incompatible with previous versions are made (for example: switching to a new backend system).
  - MINOR version change when content or functionality is added or updated (for example: new chapter, new interactive, large number of text (typo/grammar) fixes).
  - HOTFIX version change when bug hotfixes are made (for example: fixing a typo, fixing a bug in an interactive).
  - A pre-release version is denoted by appending a hyphen and the alpha label followed by the pre-release version.

We have listed major changes for each release below.

3.4.0
==============================================================================

- **Release date:** 29th June 2020
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.4.0>`__

**Changelog:**

- Allow user to choose number of cards shown in the Binary Cards interactive, plus fit cards in groups of 8 on large screens. `#1262 <https://github.com/uccser/cs-field-guide/issues/1262>`__ `#1271 <https://github.com/uccser/cs-field-guide/issues/1271>`__
- Fix issues in LZSS Compression algorithm and replace space characters with the open box character for clarity. `#1271 <https://github.com/uccser/cs-field-guide/issues/1271>`__
- Fix bug in JPEG Compression interactive where sometimes a checked checkbox was treated as unchecked and vice versa. `#1269 <https://github.com/uccser/cs-field-guide/issues/1269>`__
- Prevent visual overflow of matrices in Matrix Simplifier interactive. `#1138 <https://github.com/uccser/cs-field-guide/issues/1138>`__
- Replace downloadable Python programs for searching and sorting with links to updated Python programs on repl.it. `#1279 <https://github.com/uccser/cs-field-guide/pull/1279>`__
- Dependency updates:

  - Update coverage from 5.0 to 5.1.
  - Update django-debug-toolbar from 2.1 to 2.2.
  - Update django-modeltranslation from 0.14.1 to 0.15.
  - Update django-statici18n from 1.8.3 to 1.9.0.
  - Update django-widget-tweaks from 1.4.5 to 1.4.8.
  - Update flake8 from 3.7.9 to 3.8.3.
  - Update lxml from 4.4.2 to 4.5.1.
  - Update Pillow from 7.1.1 to 7.1.2.
  - Update pydocstyle from 5.0.1 to 5.0.2.
  - Update sphinx from 2.3.0 to 3.1.1.
  - Update wheel from 0.33.6 to 0.34.2.

3.3.1
==============================================================================

- **Release date:** 22nd April 2020
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.3.1>`__

**Changelog:**

- Solved bug in pixel viewer that was affecting some users. `#1254 <https://github.com/uccser/cs-field-guide/pull/1254>`__
- Dependency updates:

  - Update Pillow from 6.2.1 to 7.1.1.
  - Update PyYAML from 5.2 to 5.3.1.

3.3.0
==============================================================================

- **Release date:** 26th December 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.3.0>`__

**Summary of changes:**

This release adds a new chapter on 'Big Data', various improvements for interactives, and updated project and chapter icons.
A configuration tool for the sorting boxes interactive has been added, allowing teachers to setup specific examples for testing.

**Changelog:**

- Add new chapter: Big Data.
- Update project icon.
- Update chapter icons to better reflect their topics.
- Update rendering of some mathemetical equations.
- Add missing glossary terms. `#1017 <https://github.com/uccser/cs-field-guide/issues/1017>`__
- Add ability for resulting equation in matrix-simplifier to be copied and pasted into all versions of the scene-editor interactive. `#1168 <https://github.com/uccser/cs-field-guide/pull/1168>`__
- Add ability to remove all equations in the matrix-simplifier interactive at once. `#1168 <https://github.com/uccser/cs-field-guide/pull/1168>`__
- Fix spelling in title of regular expression search interactive. `#1172 <https://github.com/uccser/cs-field-guide/issues/1172>`__
- Update layout, simplify difficult password, and hide plaintext passwords of password guesser interactive. `#1172 <https://github.com/uccser/cs-field-guide/issues/1172>`__
- Improve sorting boxes interactive with clearer feedback and configurator for teachers. `#1196 <https://github.com/uccser/cs-field-guide/pull/1196>`__
- Update number memory interactive to reuse shorter password if the user remembers the longer one. `#1172 <https://github.com/uccser/cs-field-guide/issues/1172>`__
- Fix bug in colour matcher where some bits did not flip when clicked on. `#1167 <https://github.com/uccser/cs-field-guide/issues/1166>`__
- Set some external links to open in a new tab.  `#1175 <https://github.com/uccser/cs-field-guide/pull/1175>`__
- Update sentence about mesh points in computer graphics chapter. `#1170 <https://github.com/uccser/cs-field-guide/pull/1170>`__
- Remove deprecated Google App Engine health check logic. `#1187 <https://github.com/uccser/cs-field-guide/pull/1187>`__
- Remove use of float-left and float-right Bootstrap mixins. `#1171 <https://github.com/uccser/cs-field-guide/issues/1171>`__
- Minor typo and grammar fixes.
- Dependency updates:

  - Update coverage from 4.5.4 to 5.0.
  - Update django-debug-toolbar from 2.0 to 2.1.
  - Update django-modeltranslation from 0.13.3 to 0.14.1.
  - Update flake8 from 3.7.8 to 3.7.9.
  - Update lxml from 4.4.1 to 4.4.2.
  - Update Pillow from 6.2.0 to 6.2.1.
  - Update pydocstyle from 4.0.1 to 5.0.1.
  - Update PyYAML from 5.1.2 to 5.2.
  - Update sphinx from 2.2.0 to 2.3.0.

3.2.0
==============================================================================

- **Release date:** 16th October 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.2.0>`__

**Changelog:**

- Rebuild scene editor interactive. `#1115 <https://github.com/uccser/cs-field-guide/issues/1115>`__
- Create password guessing interactive. `#606 <https://github.com/uccser/cs-field-guide/issues/606>`__
- Add the ability to edit existing equations in matrix simplifier interactive. `#1137 <https://github.com/uccser/cs-field-guide/issues/1137>`__
- Fix print preview to have ability to print more than just one page in Chrome. `#1110 <https://github.com/uccser/cs-field-guide/issues/1110>`__
- Add glossary entries for the Computer Vision, Formal Languages and Network Communication Protocols chapters. `#1017 <https://github.com/uccser/cs-field-guide/issues/1017>`__
- Enable subtitles in chapter introduction videos. `#1089 <https://github.com/uccser/cs-field-guide/issues/1089>`__
- Exclude licences directory from Linkie. `#1153 <https://github.com/uccser/cs-field-guide/issues/1153>`__
- Update Django from 1.11.16 to 2.2.3. `#1111 <https://github.com/uccser/cs-field-guide/pull/1111>`__

3.1.0
==============================================================================

- **Release date:** 7th October 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.1.0>`__

**Changelog:**

- Rebuild AI sticks game. `#574 <https://github.com/uccser/cs-field-guide/issues/574>`__
- Rewrite RSA interactives. `#1119 <https://github.com/uccser/cs-field-guide/issues/1119>`__
- Add note to users about broken interactives. `#1152 <https://github.com/uccser/cs-field-guide/pull/1152>`__
- Content fixes and add glossary entries for the Computer Graphics and Complexity and Tractability chapters. `#1017 <https://github.com/uccser/cs-field-guide/issues/1017>`__
- Amend content licence to exclude certain properties we don't own. `#1149 <https://github.com/uccser/cs-field-guide/pull/1149>`__
- Update versioning system description to reflect its use in practice. `#1143 <https://github.com/uccser/cs-field-guide/pull/1143>`__
- Dependency updates:

  - Update ``pillow`` from 6.1.0 to 6.2.0.

3.0.5
==============================================================================

- **Release date:** 6th September 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.0.5>`__

**Changelog:**

- Fix broken URLs. `#1141 <https://github.com/uccser/cs-field-guide/issues/1141>`__

3.0.4
==============================================================================

- **Release date:** 5th September 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.0.4>`__

**Changelog:**

- Rebuild matrix simplifier interactive. `#375 <https://github.com/uccser/cs-field-guide/issues/375>`__
- Fix URL parameters in searching boxes interactive. `#1129 <https://github.com/uccser/cs-field-guide/issues/1129>`__
- Improvements to regular expression filter interactive. `#1020 <https://github.com/uccser/cs-field-guide/issues/1020>`__
- Content fixes and add glossary entries for coding, data representation and HCI chapters. `#1017 <https://github.com/uccser/cs-field-guide/issues/1017>`__
- Add glossary entries for AI chapter. `#1136 <https://github.com/uccser/cs-field-guide/pull/1136>`__
- Improve list of contributors. `#1127 <https://github.com/uccser/cs-field-guide/pull/1127>`__
- Dependency updates:

  - Update ``lxml`` from 4.3.4 to 4.4.1.
  - Update ``coverage`` from 4.5.3 to 4.5.4.
  - Update ``pyyaml`` from 5.1.1 to 5.1.2.
  - Update ``cssselect`` from 1.0.3 to 1.1.0.
  - Update ``pydocstyle`` from 4.0.0 to 4.0.1.
  - Update ``wheel`` from 0.33.4 to 0.33.6.
  - Update ``sphinx`` from 2.1.2 to 2.2.0.

3.0.3
==============================================================================

- **Release date:** 24th July 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.0.3>`__

**Changelog:**

- Fix bug where navbar mobile menu is positioned incorrectly. `#1068 <https://github.com/uccser/cs-field-guide/issues/1068>`__
- Add link to the release archive in footer. `#1098 <https://github.com/uccser/cs-field-guide/issues/1098>`__
- Remove references to Picasa. `#1099 <https://github.com/uccser/cs-field-guide/issues/1099>`__
- Replace brackets with UTF-8 equivalent in archive links. `#1093 <https://github.com/uccser/cs-field-guide/issues/1093>`__
- Update Google Cloud Platform health checks. `#1105 <https://github.com/uccser/cs-field-guide/pull/1105>`__
- Dependency updates:

  - Update ``flake8`` from 3.7.7 to 3.7.8.
  - Update ``pydocstyle`` from 3.0.0 to 4.0.0.
  - Update ``django-modeltranslation`` from 0.13.2 to 0.13.3.

3.0.2
==============================================================================

- **Release date:** 18th July 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.0.2>`__

**Changelog:**

- Add interactive to demonstrate limitations of short term memory.  `#144 <https://github.com/uccser/cs-field-guide/issues/144>`__
- Add second short term memory interactive. `#1090 <https://github.com/uccser/cs-field-guide/pull/1090>`__
- Fix broken links to old interactives in the computer graphics chapter.
- Update about page and introduction chapter. `#1082 <https://github.com/uccser/cs-field-guide/issues/1082>`__
- Improve consistency in chapter section beginnings. `#1065 <https://github.com/uccser/cs-field-guide/issues/1065>`__
- Align and resize homepage logos. `#1050 <https://github.com/uccser/cs-field-guide/issues/1050>`__
- Center homepage icons on Firefox mobile. `#1066 <https://github.com/uccser/cs-field-guide/issues/1066>`__
- Add link to Vox video on how snapchat filters work in the computer vision chapter. `#367 <https://github.com/uccser/cs-field-guide/issues/367>`__
- Reduce length of search bar on mobile. `#1080 <https://github.com/uccser/cs-field-guide/pull/1080>`__
- Dependency updates:

  - Update ``django-modeltranslation`` from 0.13.1 to 0.13.2.
  - Update ``Pillow`` from 6.0.0 to 6.1.0.
  - Update ``python-bidi`` from 0.4.0 to 0.4.2.

3.0.1
==============================================================================

- **Release date:** 3rd July 2019
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.0.1>`__

**Changelog:**

- Fix bug where binary cards were not flipping back to white on Chrome. `#1056 <https://github.com/uccser/cs-field-guide/issues/1056>`__
- Add background to navigation dropdown on mobile. `#1054 <https://github.com/uccser/cs-field-guide/issues/1054>`__
- Add option to reshuffle weights in sorting algorithms interactive. `#1070 <https://github.com/uccser/cs-field-guide/pull/1070>`__
- Add link to curriculum guides in useful links. `#1052 <https://github.com/uccser/cs-field-guide/issues/1052>`__
- Fix several content errors. `#1044 <https://github.com/uccser/cs-field-guide/issues/1044>`__

  - Remove broken links that have no replacement link.
  - Improve formatting and correct spelling errors.
  - Correct sentence that states there are 0.6 kilometers in a mile.

- Fix formatting issues, add glossary links and a glossary term for bozo search. `#1060 <https://github.com/uccser/cs-field-guide/pull/1060>`__
- Floating elements no longer overlap the subsection divider. `#1059 <https://github.com/uccser/cs-field-guide/issues/1059>`__
- Add a redirect for the old homepage URL to the new homepage URL. `#1058 <https://github.com/uccser/cs-field-guide/pull/1058>`__
- Correct spelling and formatting in the changelog. `#1037 <https://github.com/uccser/cs-field-guide/issues/1037>`__
- Add a temporary fix for deploying static files. `#1046 <https://github.com/uccser/cs-field-guide/issues/1046>`__

3.0.0
==============================================================================

- **Release date**: 30th June 2019
- **Downloads**: `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/3.0.0>`__

**Changelog:**

- Rebuild the CS Field Guide website to use an open source Django system based off CS Unplugged (`see the GitHub milestone <https://github.com/uccser/cs-field-guide/milestone/17>`__). Major features include:

  - Greatly improved translation features.
  - Allowing student and teacher pages to use the same URLs (switch between modes available in page footer).
  - Search functionality for English chapters.

- Improve chapter content:

  - Chapter sections are now split across pages for better readability.
  - General content, grammar, and spelling fixes.
  - View glossary definitions within a page.

- Introduce new chapter sections:

  - 'User experience' by Hayley van Waas for the Human Computer Interaction chapter.
  - 'General purpose compression' by Hayley van Waas for the Coding - Compression chapter.

- Improve interactives:

  - Introduce automated thumbnail generator.
  - Introduce many 'uninteractives' - allowing image text to be translated.
  - Update existing interactives for better accessibility.

- Introduce new interactives:

  - `Algorithm Timer`
  - `Braille Alphabet`
  - `City Trip`
  - `Dictionary Compression`
  - `Dot combinations`
  - `LZSS compression`
  - `LZW Compression`
  - `Pixel Grid`

- Remove obsolete interactives:

  - `MD5-hash`
  - `ncea-guide-selector`
  - `ziv-lempel-coding`

- Redesign homepage.
- Update documentation and contributing guides.
- Update contributors page.
- Improve licencing structure to make it easier to find and navigate on GitHub.
- Rename '2D Arrow Manipulations' interactive to '2D Shape Manipulations'.
- Introduce initial German and Spanish translations.

2.12.2
==============================================================================

- **Release date:** 5th June 2018
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/2.12.2>`__

**Changelog:**

- Add optional parameters to Pixel Viewer interactive to specific starting image, hide pixel fill, and hide menu. `#630 <https://github.com/uccser/cs-field-guide/pull/630>`__
- Grammar/spelling fixes for Data Representation and Compression Coding chapters. `#626 <https://github.com/uccser/cs-field-guide/pull/626>`__

`This release is archived for viewing here <https://archive.csfieldguide.org.nz/2.12.2/>`__

`The teacher version is archived for viewing here <https://archive.csfieldguide.org.nz/2.12.2/en/teacher/>`__

2.12.1
==============================================================================

- **Release date:** 7th March 2018
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/2.12.1>`__

**Changelog:**

- Update Artificial Intelligence chapter to use shorter introduction video.
- Update Unicode Binary interactive to display UTF mode.
- Bugfixes for Sorting/Searching Boxes interactives.
- Grammar/spelling fixes for HCI chapter.
- Correct quote by Mike Fellows in Introduction chapter.

2.12.0
==============================================================================

- **Release date:** 13th February 2018
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/2.12.0>`__

**Changelog:**

- Add Huffman coding section to compression chapter with Huffman Tree generator interactive.
- Add Viola-Jones face detection interactive.
- Add 2018 NCEA curriculum guides.
- Update Pixel Viewer interactive with threshold, blur, and edge detection modes for computer vision chapter. `#32 <https://github.com/uccser/cs-field-guide/issues/32>`__ `#388 <https://github.com/uccser/cs-field-guide/pull/388>`__
- Fix bug in Base Calculator interactive where computed value displayed incorrectly. `#558 <https://github.com/uccser/cs-field-guide/pull/558>`__
- Update Microsoft logo. `#527 <https://github.com/uccser/cs-field-guide/issues/527>`__
- Add videos to Formal Languages chapter `#518 <https://github.com/uccser/cs-field-guide/issues/518>`__
- Fix capitalisation of title of complexity and tractability chapter. `#513 <https://github.com/uccser/cs-field-guide/issues/513>`__
- Migrate Mathjax to new CDN. `#482 <https://github.com/uccser/cs-field-guide/issues/482>`__

2.11.0
==============================================================================

- **Release date:** 18th October 2017
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/2.11.0>`__

**Changelog:**

- Add Bin Packing interactive. `#490 <https://github.com/uccser/cs-field-guide/pull/490>`__
- Correct Two's Complement text. `#503 <https://github.com/uccser/cs-field-guide/issues/503>`__
- Remove contributor names from changelogs.
- Update JPEG interactive. `#488 <https://github.com/uccser/cs-field-guide/pull/488>`__
- Remove search as it focuses on outdated releases. `#508 <https://github.com/uccser/cs-field-guide/pull/508>`__
- Correctly detect text size for Unicode Length interactive. `#501 <https://github.com/uccser/cs-field-guide/pull/501>`__
- Fix broken link to CSFG in Network Protocols chapter. `#504 <https://github.com/uccser/cs-field-guide/pull/504>`__
- Fix typo in section 2.1.3. `#507 <https://github.com/uccser/cs-field-guide/pull/507>`__

2.10.1
==============================================================================

- **Release date:** 3rd September 2017
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/2.10.1>`__

**Changelog:**

- Fix broken links to NCEA curriculum guides. `#483 <https://github.com/uccser/cs-field-guide/issues/483>`__
- Fix broken link to research paper. `#484 <https://github.com/uccser/cs-field-guide/issues/484>`__
- Fix panels showing 'None' as title. `#485 <https://github.com/uccser/cs-field-guide/issues/485>`__

2.10.0
==============================================================================

- **Release date:** 2nd September 2017
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/2.10.0>`__

**Notable changes:**

This release adds a JPEG compression interactive, along with many bug fixes, and corrections.

The version numbering scheme now does not start with the `v` character (so `v2.9.1` is `2.9.1`).
This to make the numbering consistent with our other projects (CS Unplugged and cs4teachers).

**Changelog:**

- Update Delay Analyser reset button to avoid accidental resets. `#413 <https://github.com/uccser/cs-field-guide/issues/413>`__
- Add video subtitle files.
- Clean up homepage for the NCEA Curriculum Guides. `#358 <https://github.com/uccser/cs-field-guide/issues/358>`__
- Replace cosine image. `#73 <https://github.com/uccser/cs-field-guide/issues/73>`__
- Fix bug in detecting defined permissions of files. `#73 <https://github.com/uccser/cs-field-guide/issues/73>`__
- Add Google Analytic skit videos to HCI chapter. `#247 <https://github.com/uccser/cs-field-guide/issues/247>`__
- Fix Washing Machine interactive in Formal Languages chapter. `#411 <https://github.com/uccser/cs-field-guide/issues/411>`__
- Correct spelling of aesthetics and add glossary definition. `#405 <https://github.com/uccser/cs-field-guide/issues/405>`__
- Fix rendering of glossary definition headings.
- Fix PBM image data. `#412 <https://github.com/uccser/cs-field-guide/issues/412>`__
- Fix link error in HCI chapter. `#410 <https://github.com/uccser/cs-field-guide/issues/410>`__
- Add missing NCEA guides files. `#472 <https://github.com/uccser/cs-field-guide/issues/472>`__
- Fix link to private YouTube video on packets. `#408 <https://github.com/uccser/cs-field-guide/issues/408>`__
- Update binary-cards interactive to handle a higher number of cards. `#407 <https://github.com/uccser/cs-field-guide/issues/407>`__
- Add ability to hide pixel colours in pixel value interactive. `#476 <https://github.com/uccser/cs-field-guide/issues/476>`__

2.9.1
==============================================================================

- **Release date:** 20th February 2017
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.9.1>`__

**Notable changes:**

This release fixes a bug in the Computer Graphics chapter where some links to the 2D Arrow Manipulation interactives were broken due to an incorrect regex.

**Changelog:**

- `Adam Gotlib <https://github.com/Goldob>`__ `#404 <https://github.com/uccser/cs-field-guide/pull/404>`__

2.9.0
==============================================================================

- **Release date:** 27th January 2017
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.9.0>`__

**Notable changes:**

This release adds an introductory video for the Complexity and Tractability chapter, updated text for Graphics Transformations section of the Computer Graphics chapter, as well as updated versions of the 2D Arrow Manipulation and FSA interactives.

**Changelog:**

- Add introductory video to Complexity and Tractability chapter.
- Rewrite Graphics Transformations section of Computer Graphics chapter. `#402 <https://github.com/uccser/cs-field-guide/issues/402>`__
- Rewrite 2D Arrow Manipulation interactives. `#372 <https://github.com/uccser/cs-field-guide/issues/372>`__ `#373 <https://github.com/uccser/cs-field-guide/issues/373>`__
- Add list of authors in the sidebar of chapter page. `#396 <https://github.com/uccser/cs-field-guide/issues/396>`__
- Update FSA interactives. `#45 <https://github.com/uccser/cs-field-guide/issues/45>`__ `#46 <https://github.com/uccser/cs-field-guide/issues/46>`__ `#47 <https://github.com/uccser/cs-field-guide/issues/47>`__ `#48 <https://github.com/uccser/cs-field-guide/issues/48>`__
- Add NFA guesser interactive.
- Update APCSP framework. `#399 <https://github.com/uccser/cs-field-guide/issues/399>`__

2.8.1
==============================================================================

- **Release date:** 21st October 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.8.1>`__

**Changelog:**

- Update introduction chapter. `#231 <https://github.com/uccser/cs-field-guide/issues/231>`__
- Add notice of changes to AP-CSP curriculum in Fall 2016 release.
- Skip parsing `#` characters at start of Markdown links.

2.8.0
==============================================================================

- **Release date:** 19th October 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.8.0>`__

**Notable changes:**

This release adds an introductory video for the Human Computer Interaction chapter, plus a draft of guides for mapping the Computer Science Field Guide to the AP CSP curriculum.

**Changelog:**

- Add introductory video to Human Computer Interaction chapter.
- Add draft of guides for the AP CSP curriculum. `#316 <https://github.com/uccser/cs-field-guide/pull/316>`__
- Update and fix issues in high-score-boxes interactive. `#390 <https://github.com/uccser/cs-field-guide/pull/390>`__ `#391 <https://github.com/uccser/cs-field-guide/issues/391>`__ `#393 <https://github.com/uccser/cs-field-guide/issues/393>`__
- Add subtraction command to mips-simulator interactive. The interactive can now handle subtraction down to zero. `#382 <https://github.com/uccser/cs-field-guide/issues/382>`__
- Update sponsor information in footer.
- Improve the visibilty of warning panels. `#389 <https://github.com/uccser/cs-field-guide/issues/389>`__
- Fix positioning of table of contents sidebar. `#387 <https://github.com/uccser/cs-field-guide/issues/387>`__
- Fix typos in Formal Languages chapter. `#385 <https://github.com/uccser/cs-field-guide/pull/385>`__
- Update 404 page to avoid updating after each release. `#394 <https://github.com/uccser/cs-field-guide/pull/394>`__
- Remove duplicate introduction to teacher guide. `#213 <https://github.com/uccser/cs-field-guide/issues/213>`__
- Add link to article on representing a 1 bit image. `#376 <https://github.com/uccser/cs-field-guide/issues/376>`__
- Fix broken link to contributors page in footer. `#383 <https://github.com/uccser/cs-field-guide/issues/383>`__
- Replace broken link to Eliza chatterbot. `#384 <https://github.com/uccser/cs-field-guide/issues/384>`__
- Fix footer link colour in teacher version. `#395 <https://github.com/uccser/cs-field-guide/issues/395>`__

2.7.1
==============================================================================

- **Release date:** 5th September 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.7.1>`__

**Notable changes:**

- Fixed broken link in footer to contributors page.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.7.0...v2.7.1>`__

2.7.0
==============================================================================

- **Release date:** 23rd August 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.7.0>`__

**Notable changes:**

- **New video:** Formal Languages now has an introductory video.
- **New interactive:** The [hexadecimal background colour interactive interactives/hex-background-colour/index.html) allows a user to change the background colour of the page.
- **New curriculum guide:** A guide for NCEA `Artificial Intelligence: Turing Test <https://docs.google.com/document/d/1TnP0sCW33Yhy4wQITDre1sirB0IonesCfdbO0WqJjow>`__ has been added.
- **Updated interactives:** The `box translation <interactives/box-translation/index.html>`__ and `box rotation <interactives/box-rotation/index.html>`__ interactives are now open source and have been given a new look and made mobile friendly.
- **Generation improvements:** Basic translation support. Settings are now specific to each language, and contain the translation text.
- **Website improvements:** Added `help guide <further-information/interactives.html>`__ for WebGL interactives.
- Also includes bug fixes to interactives, new links to supporting videos, and various text corrections from our staff and contributors.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.6.1...v2.7.0>`__

2.6.1
==============================================================================

- **Release date:** 14th July 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.6.1>`__

**Notable changes:**

- Fixed issue on Human Computer Interaction chapter where duplicate library was causing several UI elements to not behave correctly.

2.6.0
==============================================================================

- **Release date:** 16th June 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.6.0>`__

**Notable changes:**

- **New feature:** PDF output - A downloadable PDF of both student and teacher versions is now available from the homepage. The PDF also functions well as an ebook, with functional links to headings, glossary entries, interactives, and online resources.
- **New feature:** Printer friendly webpages - When printing a page of the CSFG through a browser, the page displays in a printer friendly manner by hiding navigational panels, opening all panels, and providing extra links to online resources.
- **New interactive:** The `binary cards interactive <interactives/binary-cards/index.html>`__ emulates the Binary Cards CS Unplugged activity, used to teach binary numbers.
- **New interactive:** The `high score boxes interactive <interactives/high-score-boxes/index.html>`__ was developed to give an example of searching boxes to find a maximum value to the student.
- **New interactive:** The `action menu interactive <interactives/action-menu/index.html>`__ is a small dropdown menu with one option that has severe consequences, but no confirmation screen if the user selects that option (used to demonstrate a key HCI concept).
- **Updated interactive:** The `trainsylvania interactive <interactives/trainsylvania/index.html>`__ (and supporting images/files) have been given a fresh coat of colour and a new station name.
- **Updated interactive:** The `trainsylvania planner <interactive interactives/trainsylvania-planner/index.html>`__ is used alongside the trainsylvania interactive, and allows the user to input a path of train trips to see the resulting destination.
- **Updated interactive:** The `base calculator <interactives/base-calculator/index.html>`__ allows a student to calculate a number, using a specific number base (binary, hexadecimal, etc).
- **Updated interactive:** The `big number calculator <interactives/big-number-calculator/index.html>`__ allows a student to perform calculations with very large numbers/results.
- **Website improvements:** Redesigned homepage and footer with useful links and a splash of colour. Math equations are now line wrapped, and MathJax is loaded from a CDN. Images can now have text wrapped around them on a page.
- **Generation improvements:** Improvements to internal link creation (glossary links in particular). Separated dependency installation from generation script (see documentation for how to install and run generation script).
- **Project improvements:** Added documentation for contributing to and developing this project, including a code of conduct.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.5.0...v2.6.0>`__

2.5.0
==============================================================================

- **Release date:** 13th May 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.5.0>`__

**Notable changes:**

- The Data Representation chapter has been rewritten and reorganised to be easier to follow, and three NCEA assessment guides have been written for students aiming for merit/excellence:
- `Numbers (Two's Complement) <curriculum-guides/ncea/level-2/excellence-data-representation-numbers.html>`__
- `Text (Unicode) <curriculum-guides/ncea/level-2/excellence-data-representation-text.html>`__
- `Colours (Various bit depths) <curriculum-guides/ncea/level-2/excellence-data-representation-colour.html>`__

The chapter and assessment guides have been rewritten to take account of new feedback from the marking process and our own observations of student work.

As part of the rewrite of the Data Representation chapter, the following interactives were developed:

- New interactive: The `unicode binary <interactive interactives/unicode-binary/index.html>`__  displays the binary for a given character (or character by decimal number) dynamically with different encodings.
- New interactive: The `unicode character <interactive interactives/unicode-chars/index.html>`__  displays the character for a given decimal value.
- New interactive: The `unicode length <interactive interactives/unicode-length/index.html>`__  displays the length (in bits) of text encoded using different encodings.
- Updated interactive: The `colour matcher <interactive interactives/colour-matcher/index.html>`__  has been redesigned to display values in binary, plus allow students to see and edit the bit values. The interface has also been restructured for readability and ease of use.

The old version of the Data Representation chapter can be `found here <http://csfieldguide.org.nz/releases/2.4.1/en/chapters/data-representation.html>`__

- Website improvements: A new image previewer was implemented, along with bugfixes to iFrame and panel rendering.
- Generation improvements: The Markdown parser has been replaced due to existing parsing issues. The new parser also gives us a large performance boost. A text box tag has also been added to highlight important text.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.4.1...v2.5.0>`__

2.4.1
==============================================================================

- **Release date:** 29th April 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.4.1>`__

**Notable changes:**

- Fixed version numbering system to allow hotfix changes

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.4...v2.4.1>`__

2.4
==============================================================================

- **Release date:** 29th April 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.4>`__

**Notable changes:**

- Large number of typo, grammar, link, and math syntax fixes and also content corrections by contributors.
- New interactive: Added `GTIN-13 checksum calculator interactive <interactives/checksum-calculator-gtin-13/index.html>`__ for calculating the last digit for a GTIN-13 barcode.
- Updated interactive: The `regular expression search interactive <interactives/regular-expression-search/index.html>`__ has been updated and added to the repository.
- Updated interactive: The `image bit comparer interactive <interactives/image-bit-comparer/index.html>`__ has been updated and added to the repository. It also has a `changing bits mode <interactives/image-bit-comparer/index.html?change-bits=true>`__ which allows the user to modify the number of bits for storing each colour.
- Added XKCD mouseover text (similar behaviour to website).
- Added feedback modal to allow developers to directly post issues to GitHub.
- Added encoding for HTML entities to stop certain characters not appearing correctly in browsers.
- Added summary of output at end of generation script.
- Added message for developers to contribute in the web console.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.3...v2.4>`__

2.3
==============================================================================

- **Release date:** 10th March 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.3>`__

**Notable changes:**

- Readability improvements to text within many chapters (grammer issues/typos) and to the Python scripts within the Algorithms chapter.
- Updated interactive: The RSA `encryption <interactives/rsa-no-padding/index.html>`__ and `decryption <interactives/rsa-no-padding/index.html?mode=decrypt>`__ interactives within Encryption have been updated and added to the repository.
- Updated interactive: The `searching algorithms interactive <interactives/searching-algorithms/index.html>`__ within Algorithms have been updated and added to the repository.
- Updated interactive: The `word filter interactive <interactives/regular-expression-filter/index.html>`__ within Formal Languages have been updated and added to the repository.
- Updated interactives: Both the `MIPS assembler <interactives/mips-assembler/index.php>`__ and `MIPS simulator <interactives/mips-simulator/index.php>`__ were made open source by the original author, and we were given permission to incorporate our repository, and have been added to Programming Languages.
- A list of all interactives are now available on the `interactives page <further-information/interactives.html>`__

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.2...v2.3>`__

2.2
==============================================================================

- **Release date:** 19th February 2016
- **Downloads:** `Source downloads are available on GitHub  <https://github.com/uccser/cs-field-guide/releases/tag/v2.2>`__

**Notable changes:**

- New interactive: Parity trick with separate modes for `practicing setting parity <interactives/parity/index.html?mode=set>`__, `practicing detecting parity <interactives/parity/index.html?mode=detect>`__, and `the whole trick <interactives/parity/index.html>`__. Also has a `sandbox mode <interactives/parity/index.html?mode=sandbox>`__.
- Updated interactives: Two colour mixers, one for `RGB <interactives/rgb-mixer/index.html>`__ and one for `CMY <interactives/cmy-mixer/index.html>`__ have been added.
- Updated interactive: A `colour matcher interactive <interactives/colour-matcher/index.html>`__ has been added for matching a colour in both 24 bit and 8 bit.
- Updated interactive: A `python interpreter interactive <interactives/python-interpreter/index.html>`__ has been added for the programming languages chapter.
- Website improvements: Code blocks now have syntax highlighting when a language is specified, dropdown arrows are fixed in Mozilla Firefox browsers, and whole page interactives now have nicer link buttons.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.1...v2.2>`__

2.1
==============================================================================

- **Release date:** 12th February 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.1>`__

**Notable changes:**

- Fixed many broken links and typos from 2.0.0
- Added calculator interactives to Introduction
- Added RSA key generator to Encryption
- Rewritten Braille Section in Data Representation

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.0...v2.1>`__

2.0
==============================================================================

- **Release date:** 5th February 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/tag/v2.0>`__

**Notable changes:**

- First open source release
- Produces both student and teacher versions
- Produces landing page for selecting language
- Added new NCEA curriculum guides on Encryption and Human Computer Interaction

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.0-alpha.3...v2.0>`__

**Comments:**

The first major step in releasing a open source version of the Computer Science Field Guide.
While some content (most notably interactives) have yet to be added to the new system, we are releasing this update for New Zealand teachers to use at the beginning of their academic year.
For any interactives that are missing, links are in place to the older interactives.

2.0-alpha.3
==============================================================================

- **Release date:** 29th January 2016
- **Downloads:** `Source downloads are available on GitHub <https://github.com/uccser/cs-field-guide/compare/d8a69d50575cac8c4e2686ee4d9af7c22b7131a7...v2.0-alpha.3>`__

2.0-alpha.2
==============================================================================

- **Release date:** 25th January 2016

2.0-alpha.1
==============================================================================

- **Release date:** 2nd December 2015

**Comments:**
Released at CS4HS 2015.

1.?.?
==============================================================================

- **Release date:** 3rd February 2015

**Comments:**

The last version of the CSFG before the open source version was adopted.

`This release is archived for viewing here <https://archive.csfieldguide.org.nz/1.9.9/>`__

`The teacher version is archived for viewing here <https://archive.csfieldguide.org.nz/1.9.9/teacher/>`__
