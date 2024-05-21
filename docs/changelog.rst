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
`All downloads are available on GitHub <https://github.com/uccser/cs-field-guide/releases/>`__

3.15.1
==============================================================================

**Release date:** 22nd May 2024

**Changelog:**

- Update docker images to use debian bookworm
- Update docker images to python 3.11
- Core Dependency changes:

    - Update crowdin/github-action from 1.20.2 to 1..20.4
    - Update iframe-resizer from 4.3.11 to 4.4.0
    - Update sass from 1.77.0 to 1.77.2
    - Update selenium from 4.20.0 to 4.21.0
    - Update lxml from 5.2.1 to 5.2.2
    - Update django-modeltranslation from 0.18.12 to 0.18.13

- Interactive cmy-mixer Dependency changes:

    - Update nouislider from 15.7.1 to 15.7.2

- Interactive colour-matcher Dependency changes:

    - Update nouislider from 15.7.1 to 15.7.2

- Interactive data-bias Dependency changes:

    - Update nouislider from 15.7.1 to 15.7.2

- Interactive data-visualisation Dependency changes:

    - Update chart.js from 4.4.2 to 4.4.3

- Interactive frequency-analysis Dependency changes:

    - Update chart.js from 4.4.2 to 4.4.3

- Interactive rgb-mixer Dependency changes:

    - Update nouislider from 15.7.1 to 15.7.2

- Interactive training-ground Dependency changes:

    - Update nouislider from 15.7.1 to 15.7.2

3.15.0
==============================================================================

**Release date:** 10th May 2024

**Changelog:**

- Fix broken links containing ``)``
- Add readthedocs yaml file
- Add optional slug field to chapter sections to allow for slug overriding
- Add codecov token to test and deploy workflow
- Add appendix pages to search
- Add tests for appendix model, utility functions and appendix loader
- Existing tests for appendix app re-enabled and updated
- Core Dependency changes:

    - Update dependabot/fetch-metadata from 2.0.0 to 2.0.1
    - Update sphinx from 7.2.6 to 7.3.7
    - Update gunicorn from 21.2.0 to 22.0.0
    - Update selenium from 4.19.0 to 4.20.0
    - Update Pygments from 2.17.2 to 2.18.0
    - Update xml from 4.9.4 to 5.2.1
    - Update django-statici18n from 2.4.0 to 2.5.0
    - Update coverage from 7.4.4 to 7.5.1
    - Update @babel/core from 7.24.4 to 7.24.5
    - Update @babel/preset-env from 7.24.4 to 7.24.5
    - Update cssnano from 6.1.2 to 7.0.1
    - Update gulp-imagemin from 9.0.0 to 9.1.0
    - Update iframe-resizer from 4.3.9 to 4.3.11
    - Update sass from 1.75.0 to 1.77.0

- Interactive algorithm-timer Dependency changes:

    - Update mathjs from 12.4.1 to 12.4.2

- Interactive city-trip Dependency changes:

    - Update mathjs from 12.4.1 to 12.4.2
    - Update cytoscape from 3.28.1 to 3.29.2

- Interactive matrix-simplifier Dependency changes:

    - Update mathjs from 12.4.1 to 12.4.2

3.14.0
==============================================================================

**Release date:** 18th April 2024

**Changelog:**

- Add Usability principles relating to mātāpono Māori section to the HCI chapter.
- Add accessibility section to the HCI chapter.
- Add consistency conent to the HCI chapter.
- Add mātanga section to Contributors page.
- Add support for esm modules and es6+ syntax transpilation.
- Add package-lock for all interactives.
- Improve pixel viewer interactive's UI clarity.
- Improve scene editor interactive's brightness.
- Improve documentation.
- Fix scene editor interactive.
- Fix 'No interactives' note missing from interactives index page: software engineering.
- Fix Regular Expression Search interactive doesn't show syntax highlighting.
- Fix radio buttons for CMY/RGB colour mixers.
- Fix link to tcpdump docs in Network Communication Protocols section.
- Fix bug where user can remove all cities in City Trip interactive.
- Allow translations of the stations in the Trainsylvania Map.
- Remove animation on charts in data visualisation interactive.
- Update Node image to latest LTS.
- Core Python dependency changes:

    - Update django from 3.2.16 to 4.2.11
    - Update django-environ from 0.9.0 to 0.11.2
    - Update gunicorn from 20.1.0 to 21.2.0
    - Update whitenoise from 6.2.0 to 6.6.0
    - Update psycopg2 from 2.9.5 to 2.9.9
    - Update selenium from 4.7.0 to 4.19.0
    - Update verto from 1.0.1 to 1.1.1
    - Update Pygments from 2.13.0 to 2.17.2
    - Update lxml from 4.9.2 to 4.9.4
    - Update PyYAML from 5.4.1 to 6.0.1
    - Update django-modeltranslation from 0.18.7 to 0.18.12
    - Update uniseg from 0.7.2 to 0.8.0
    - Update django-statici18n from 2.3.1 to 2.4.0
    - Update django-cors-headers from 3.13.0 to 4.3.1
    - Update django-debug-toolbar from 3.8.1 to 4.3.0
    - Update flake8 from 4.0.1 to 7.0.0
    - Update pydocstyle from 6.1.1 to 6.3.0
    - Update coverage from 6.5.0 to 6.5.0

- Core JS dependency changes:

    - Add @babel/core 7.24.4
    - Add @babel/preset-env 7.24.4
    - Add babelify 10.0.0
    - Update autoprefixer from 10.4.13 to 10.4.19
    - Update browser-sync from 2.27.10 to 3.0.2
    - Update cssnano from 5.1.14 to 6.1.2
    - Update gulp-filter from 7.0.0 to 9.0.1
    - Update gulp-imagemin from 7.1.0 to 9.0.0
    - Update gulp-postcss from 9.0.1 to 10.0.0
    - Update iframe-resizer from 4.3.2 to 4.3.9
    - Update jquery from 3.6.2 to 3.7.1
    - Update multiple-select from 1.5.2 to 1.7.0
    - Update postcss from 8.4.20 to 8.4.38
    - Update sass from 1.56.2 to 1.75.0
    - Update yargs from 17.6.2 to 17.7.2
    - Remove child_process
    - Remove got

- Github Action dependency changes:

    - Update actions/checkout from 3 to 4
    - Update actions/setup-python from 4 to 5
    - Update actions/upload-artifact from 3 to 4
    - Update actions/download-artifact from 3 to 4
    - Update crowdin/github-action from 1.5.2 to 1.20.2
    - Update codecov/codecov-action from 3 to 4
    - Update dependabot/fetch-metadata from 1.3.5 to 2.0.0
    - Update docker/login-action from 2.1.0 to 3.1.0
    - Update docker/build-push-action from 3.2.0 to 5.3.0
    - Update docker/metadata-action from 4 to 5

- Interactive algorithm-timer dependency changes:

    - Update mathjs from 5.5.0 to 12.4.1

- Interactive bin-packing dependency changes:

    - Update interactjs from 1.10.17 to 1.10.27

- Interactive city-trip dependency changes:

    - Update cytoscape from 3.23.0 to 3.28.1
    - Update mathjs from 5.5.0 to 12.4.1

- Interactive cmy-mixer dependency changes:

    - Update nouislider from 13.1.5 to 15.7.1

- Interactive colour-matcher dependency changes:

    - Update nouislider from 13.1.5 to 15.7.1

- Interactive data-bias dependency changes:

    - Update nouislider from 13.1.5 to 15.7.1

- Interactive data-visualisation dependency changes:

    - Update chart.js from 2.9.1 to 4.4.2

- Interactive frequency-analysis dependency changes:

    - Update chart.js from 2.7.2 to 4.4.2
    - Remove es5-shim
    - Remove es6-shim

- Interactive jpeg-compression dependency changes:

    - Update interactjs from 1.10.17 to 1.10.27

- Interactive matrix-simplifier dependency changes:

    - Update mathjs from 6.0.3 to 12.4.1
    - Update sprintf-js from 1.1.2 to 1.1.3

- Interactive packet-attack dependency changes:

    - Update phaser from 3.55.2 to 3.80.1

- Interactive password-guesser dependency changes:

    - Update crypto-js from 3.1.9-1 to 4.2.0

- Interactive rgb-mixer dependency changes:

    - Update nouislider from 13.1.5 to 15.7.1

- Interactive rsa-decryption dependency changes:

    - Update big-integer from 1.6.51 to 1.6.52

- Interactive scene-editor dependency changes:

    - Update mathjs from 6.0.3 to 12.4.1
    - Update three from 0.147.0 to 0.163.0
    - Update sprintf-js from 1.1.2 to 1.1.3
    - Remove three-orbit-controls

- Interactive training-ground dependency changes:

    - Update nouislider from 13.1.5 to 15.7.1

- Interactive unicode-binary dependency changes:

    - Update string.fromcodepoint from 1.0.0 to 1.0.3

- Interactive unicode-chars dependency changes:

    - Update string.fromcodepoint from 1.0.0 to 1.0.3

- Interactive viola-jones-face-detector dependency changes:

    - Update interactjs from 1.10.17 to 1.10.27

- Docs dependency changes:

    - Update sphinx from 5.3.0 to 7.2.6
    - Update sphinx-rtd-theme from 1.1.1 to 2.0.0

3.13.0
==============================================================================

**Release date:** 15th December 2022

**Changelog:**

- Add section about Shannon's Experiment to the Compression chapter.
- Add more comprehensive Getting Started documentation.
- Add an "Adding a chapter" section to the Author Documentation.
- Update infrastructure to fix issues with local development on multi-user Linux machines.
- Fix majority of loading bugs caused by the 3.12.6 release.
- Core dependency changes:

    - Update crowdin/github-action from 1.5.0 to 1.5.2
    - Update decode-uri-component from 0.2.0 to 0.2.2
    - Update dependabot/fetch-metadata from v1.3.4 to v1.3.5
    - Update django-debug-toolbar from 3.7.0 to 3.8.1
    - Update django-modeltranslation from 0.18.5 to 0.18.7
    - Update engine.io from 6.2.0 to 6.2.1
    - Update jquery from 3.6.1 to 3.6.2
    - Update lxml from 4.9.1 to 4.9.2
    - Update postcss from 8.4.18 to 8.4.20
    - Update sass from 1.55.0 to 1.56.2
    - Update selenium from 4.5.0 to 4.7.0
    - Update socket.io-parser from 4.0.4 to 4.0.5
    - Update sphinx-rtd-theme from 1.1.0 to 1.1.1
    - Update yargs from 17.6.0 to 17.6.2

- Interactive scene-editor dependency changes:

    - Update three from 0.146.0 to 0.147.0

3.12.6
==============================================================================

**Release date:** 3rd November 2022

**Changelog:**

- Update content rather than recreating it when ``update_data`` script is run.
- Dependency updates:

    - Update crowdin/github-action from 1.4.16 to 1.5.0.
    - Update sphinx-rtd-theme from 1.0.0 to 1.1.0.

3.12.5
==============================================================================

**Release date:** 31st October 2022

**Changelog:**

- Fix bug where rgb-mixer interactive couldn't load required CSS file.
- Dependency updates:

    - Update cssnano from 5.1.13 to 5.1.14.

3.12.4
==============================================================================

**Release date:** 31st October 2022

**Changelog:**

- Add abiltiy to set initial zoom level in pixel-viewer interactive via URL parameter.
- Remove broken documentation link.
- Disable healthcheck on Docker task service to prevent deletion while running.

3.12.3
==============================================================================

**Release date:** 29th October 2022

**Changelog:**

- Add abiltiy to hide pixel colour codes in pixel-viewer interactive via URL parameter.
- Fix bug where imported package CSS files were not imported.
- Fix bug where pixel-viewer interactive isn't sized correctly when embedded via iframe.
- Replaced deprecation method in matrix-simplifier interactive.
- Update analytics to Plausible.
- Rewrite documentation to project specific content, and linking to general UCCSER documentation where required.
- Display white favicon when browser dark theme is used.  `#1957 <https://github.com/uccser/cs-field-guide/issues/1957>`__
- Add project logo variants with text.
- Core dependency changes:

    - Update autoprefixer from 10.4.12 to 10.4.13.
    - Update crowdin/github-action from 1.4.15 to 1.4.16.
    - Update cssselect from 1.1.0 to 1.2.0.
    - Update django from 3.2.15 to 3.2.16.
    - Update psycopg2 from 2.9.4 to 2.9.5.

- Interactive scene-editor dependency changes:

    - Update three from 0.145.0 to 0.146.0.

3.12.2
==============================================================================

**Release date:** 20th October 2022

**Changelog:**

- Add ability to hide mode headings and initial text in Parity interactive.
- Add ability to circle a row and column in Parity interactive by clicking on a grid reference label (or where they would be if they're hidden).
- Fix bug where edges of barcode where visible in the Product Code Check Digit Calculation interactive when embedded.  `#1965 <https://github.com/uccser/cs-field-guide/issues/1965>`__
- Modify Docker deployment workflow to be in line with UCCSER repositories.  `#1971 <https://github.com/uccser/cs-field-guide/issues/1971>`__

3.12.1
==============================================================================

**Release date:** 19th October 2022

**Changelog:**

- Allow QR Code Generator interactive controls to be hidden via URL parameter.
- Allow Parity interactive settings be changed via URL parameter, including setting grid size, presetting intial bit values, hiding controls, and showing grid references.

- Core dependency changes:

    - Update crowdin/github-action from 1.4.14 to 1.4.15.
    - Update django-modeltranslation from 0.18.4 to 0.18.5.
    - Update docker/build-push-action from 3.1.1 to 3.2.0.
    - Update docker/login-action from 2.0.0 to 2.1.0.
    - Update postcss from 8.4.17 to 8.4.18.
    - Update sphinx from 5.2.3 to 5.3.0.

3.12.0
==============================================================================

**Release date:** 11th October 2022

**Changelog:**

- Add Product Code Check Digit Calculation interactive.
- Add QR Code Generator interactive.
- Rename Shannan Experiment interactive to Shannon's prediction and entropy of printed text experiment.
- Fix bug where interactive NPM dependecies were being overriden by base NPM dependencies. Interactive dependencies have been updated accordingly.
- Remove FSA dependency with simplified JavaScript solution.
- Core dependency changes:

    - Update autoprefixer from 10.4.8 to 10.4.12.
    - Update coverage from 6.4.4 to 6.5.0.
    - Update crowdin/github-action from 1.4.12 to 1.4.14.
    - Update dependabot/fetch-metadata from v1.3.3 to v1.3.4.
    - Update django-debug-toolbar from 3.6.0 to 3.7.0.
    - Update node from 14.19.0-buster to 14.20.0-buster.
    - Update postcss from 8.4.16 to 8.4.17.
    - Update psycopg2 from 2.9.3 to 2.9.4.
    - Update sass from 1.54.5 to 1.55.0.
    - Update selenium from 4.4.0 to 4.5.0.
    - Update sphinx 5.1.1 to 5.2.3.
    - Update uniseg from 0.7.1.post2 to 0.7.2.
    - Update yargs from 17.5.1 to 17.6.0.

- Interactive city-trip dependency changes:

    - Update cytoscape from 3.22.1 to 3.23.0.

- Interactive product-code-check-digit-calculation dependency changes:

    - Add arrows-svg 1.5.6.
    - Add jsbarcode 3.11.5.

- Interactive qr-code-generator dependency changes:

    - Add qrcode-generator 1.4.4.

- Interactive scene-editor dependency changes:

    - Update three from 0.143.0 to 0.145.0.
    - Add sprintf-js 1.1.2 (to be independent from base package.json file).

- Interactive shannon-experiment dependency changes:

    - Add chart.js 3.9.1.

3.11.0
==============================================================================

**Release date:** 30th August 2022

**Changelog:**

- Add Shannon Experiment interactive prototype.
- Update Computer Security URLs and typo. `#1913 <https://github.com/uccser/cs-field-guide/issues/1913>`__
- Fix outdated references to interactive. `#1902 <https://github.com/uccser/cs-field-guide/issues/1902>`__
- Fix issue where items on the top navigation bar couldn't fit on one line on small screens.
- Update project to use uccser-development-stack v3.
- Show full Git SHA on development website.
- Add OCI labels to Django Docker image.
- Update Traefik middleware to use a unique name in production deployment.
- Fix bug preventing translation pipeline from completing.

- Core dependency changes:

    - Add gulp-dependents 1.2.5.
    - Update autoprefixer from 10.4.7 to 10.4.8.
    - Update bootstrap from 4.6.1 to 4.6.2.
    - Update coverage from 6.4.1 to 6.4.4.
    - Update crowdin/github-action from 1.4.9 to 1.4.12.
    - Update cssnano from 5.1.12 to 5.1.13.
    - Update django from 3.2.14 to 3.2.15.
    - Update django-debug-toolbar from 3.4.0 to 3.6.0.
    - Update django-modeltranslation from 0.18.2 to 0.18.4.
    - Update django-statici18n from 2.2.0 to 2.3.1.
    - Update docker/build-push-action from v3.0.0 to v3.1.1.
    - Update jquery from 3.6.0 to 3.6.1.
    - Update postcss from 8.4.14 to 8.4.16.
    - Update postgres from 13.3 tp 13.8.
    - Update Pygments from 2.12.0 to 2.13.0.
    - Update sass from 1.53.0 to 1.54.5.
    - Update selenium from 4.3.0 to 4.4.0.
    - Update sphinx from 5.0.2 to 5.1.1.
    - Remove urijs.

- Interactive big-number-calculator dependency changes:

    - Update big.js from 6.2.0 to 6.2.1.

- Interactive bin-packing dependency changes:

    - Update interactjs from 1.10.14 to 1.10.17.

- Interactive box-rotation dependency changes:

    - Update three from 0.142.0 to 0.143.0.

- Interactive box-translation dependency changes:

    - Update three from 0.142.0 to 0.143.0.

- Interactive city-trip dependency changes:

    - Update cytoscape from 3.21.2 to 3.22.1.

- Interactive jpeg-compression dependency changes:

    - Update interactjs from 1.10.14 to 1.10.17.

- Interactive scene-editor dependency changes:

    - Update three from 0.142.0 to 0.143.0.

- Interactive unicode-binary dependency changes:

    - Remove urijs.

- Interactive viola-jones-face-detector dependency changes:

    - Update interactjs from 1.10.14 to 1.10.17.

3.10.2
==============================================================================

**Release date:** 6th July 2022

**Changelog:**

- Update Trainsylvania interactives imagery and station names.
- Combine trainsylvania-blank and trainsylvania-complete into trainsylvania-map interactive.
- Remove trainsylvania blank map file in favor of trainsylvania-map interactive.
- Add options to binary-cards interactive for hiding UI elements and displaying right to left.
- Fix bug where scene-editor interactive wasn't working. `#1837 <https://github.com/uccser/cs-field-guide/issues/1837>`__
- Fix indentation within Dependabot configuration file.
- Fix Gulp watch task to watch correct files.
- Add attribution to texture used in scene-editor interactive.
- Update Gulp JS task to only update files changed since last run.

- Core dependency changes:

    - Update dependabot/fetch-metadata from v1.3.1 to v1.3.3.
    - Update django from 3.2.13 to 3.2.14.
    - Update lxml from 4.9.0 to 4.9.1.

- Interactive box-rotation dependency changes:

    - Update three from 0.141.0 to 0.142.0.

- Interactive box-translation dependency changes:

    - Update three from 0.141.0 to 0.142.0.

- Interactive scene-editor dependency changes:

    - Update three from 0.141.0 to 0.142.0.

3.10.1
==============================================================================

**Release date:** 28th June 2022

**Changelog:**

- Add search functionality for English language.
- Updates to binary cards interactive:

    - Only creates card elements as required.
    - Fixes bug with defining number of cards.
    - Allows card total to be toggled or hidden.

- Remove broken link in the Images and Colours section witin the Data Representation chapter.
- Update glossary definition of Algorithm.
- Allow centered interactives to be embedded anywhere (this will likely change in the future to be restricted only to UCCSER domains).
- Add permalinks to glossary page entries.
- Fix bug where interactive thumbnails were missing assets during creation. `#1745 <https://github.com/uccser/cs-field-guide/issues/1745>`__
- Fix bug where CFG Parser examples weren't loaded. `#1789 <https://github.com/uccser/cs-field-guide/issues/1789>`__
- Update test coverage to codecov.
- Suppress gunicorn access and error logs during local development.
- Auto-merge minor dependency updates (this includes minor and patch updates).
- Allow all dependency update pull requests to be created (remove open limit on Dependabot).
- Ignore updates to non-LTS Django packages.

- Core dependency changes:

    - Update actions/checkout from v2 to v3.
    - Update actions/download-artifact from v2 to v3.
    - Update actions/setup-python from v2 to v4.
    - Update actions/upload-artifact from v2 to v3.
    - Update ansi-colours from 4.1.1 to 4.1.3.
    - Update autoprefixer from 10.3.7 to 10.4.7.
    - Update browser-sync from 2.27.5 to 2.27.10.
    - Update codemirror from 5.65.0 to 5.65.6.
    - Update coverage from 6.2 to 6.4.1.
    - Update crowdin/github-action from 1.4.7 to 1.4.9.
    - Update cssnano from 5.0.8 to 5.1.12.
    - Update django from 3.2.12 to 3.2.13.
    - Update django-cors-headers from 3.11.0 to 3.13.0.
    - Update django-debug-toolbar from 3.2.4 to 3.4.0.
    - Update django-environ from 0.8.1 to 0.9.0.
    - Update django-modeltranslation from 0.17.3 to 0.18.2.
    - Update docker/build-push-action from v2.9.0 to v3.0.0.
    - Update docker/build-push-action from v2.9.0 to v3.0.0.
    - Update docker/login-action from v1.13.0 to v2.0.0.
    - Update docker/metadata-action from v3 to v4.
    - Update fancy-log from 1.3.3 to 2.0.0.
    - Update flake8 from 3.9.2 to 4.0.1.
    - Update gulp-sass from 5.0.0 to 5.1.0.
    - Update lxml from 4.8.0 to 4.9.0.
    - Update postcss 8.4.5 to 8.4.14.
    - Update Pygments from 2.11.2 to 2.12.0.
    - Update sass from 1.49.8 to 1.53.0.
    - Update selenium from 4.1.1 to 4.3.0.
    - Update sphinx from 4.4.0 to 5.0.2.
    - Update whitenoise from 6.0.0 to 6.2.0.
    - Update yargs from 10.3.1 to 10.5.1.
    - Remove intro.js 4.2.2.

- Interactive big-number-calculator dependency changes:

    - Update big.js from 5.1.2 to 6.2.0.

- Interactive bin-packing dependency changes:

    - Update interactjs from 1.10.11 to 1.10.14.

- Interactive box-rotation dependency changes:

    - Update three from 0.138.0 to 0.141.0.
    - Update @tweenjs/tween.js from 17.3.0 to 18.6.4.

- Interactive box-translation dependency changes:

    - Update three from 0.138.0 to 0.141.0.
    - Update @tweenjs/tween.js from 17.3.0 to 18.6.4.

- Interactive city-trip dependency changes:

    - Update cytoscape from 3.21.0 to 3.21.2.

- Interactive frequency-analysis dependency changes:

    - Update es5-shim from 4.6.5 to 4.6.7.

- Interactive jpeg-compression dependency changes:

    - Update interactjs from 1.10.11 to 1.10.14.

- Interactive scene-editor dependency changes:

    - Update three from 0.138.0 to 0.141.0.

- Interactive unicode-binary dependency changes:

    - Update urijs from 1.19.8 to 1.19.11.
    - Update string.fromcodepoint from 0.2.1 to 1.0.0.

- Interactive unicode-chars dependency changes:

    - Update string.fromcodepoint from 0.2.1 to 1.0.0.

- Interactive viola-jones-face-detector dependency changes:

    - Update interactjs from 1.10.11 to 1.10.14.

3.10.0
==============================================================================

**Release date:** 31st March 2022

**Changelog:**

- Add new chapter 'Computer Security'.

  - The chapter only contains text currently, images and interactives will be added at a later time.

- Minor text changes (e.g. grammar corrections) in 'Grammars and Parsing' section.
- Add glossary definitions for:

  - Terminal
  - Non-terminal
  - Production

- Add new panel type 'Exercise'.
- Fix alignment of panels within a nested list.
- Show chapter section name in browser title.
- Increase size of context-free grammar parsing challenge working box.
- Improve interface when context-free grammar parsing challenge has examples.
- Change relative links within chapter and chapter section text to open in a new tab.
- Remove search functionality, due to high costs and no user usage.
- Dependency changes:

  - Remove django-haystack[elasticsearch] 3.1.1.
  - Remove elasticsearch 5.5.3.
  - Remove django-widget-tweaks 1.4.8.

3.9.0
==============================================================================

**Release date:** 26th February 2022

**Summary of changes:**

This release adds new content on grammars and parsing, QR codes, Fitts' law, and other ways to represent FSAs.

**Changelog:**

- Add new section in 'Formal Languages' chapter on 'Grammars and Parsing'.
- Add new section in 'Coding - Error Control' chapter on 'QR codes'.
- Add new section in 'Human Computer Interaction' chapter on 'Pointing at things: Fitts' Law'
- Add new content in 'Finite State Automata' section on 'Other ways to represent finite state automata'.
- Add seven new interactives for new and upcoming content:

  - Fitts' law
  - Clicking with shaking
  - Index of difficulty calculator
  - Plane turbulence
  - Firewall sorting
  - Password strength - Brute force variant
  - Password strength - Dictionary attack variant

- Update definition of 'Parse tree' in glossary.
- Fix broken link to padding in cryptography Wikipedia page.
- Update 'CFG Parsing Challenge' interactive:

  - Disable the text field that allows customising the equation text, as it's prone to errors. This can be re-enabled with the URL parameter ``editable-target``.
  - Modify 'New productions' button to 'Customise productions', and lower it's priority in the interactive. The productions menu is also prefilled with the currently loaded exercise. This can be disabled with the URL parameter ``hide-builder``.
  - Increase average difficulty of random equations.
  - Update terms used for user prompts.

- Update 'NFA Guesser' interactive:

  - Allow answer to be optionally viewed after multiple failed attempts.
  - Change answer options to match appearance in NFA map.

- Update 'Parity Trick' interactive:

  - Add optional grid references.

- Fix incorrect solution for representing 'water' as binary.
- Add tracking of dependencies within interactives using Dependabot.
- Modify command names to be consistent across UCCSER projects.
- Remove resource links to websites that do not exist anymore.
- Add open/close symbols and types titles (for example 'Curiosity') on panels. Panels can also be forced to be always open.
- Pause of playing Vimeo video within a closed panel.
- Add URL for website status information.
- Open button links in a new tab.
- Fix bug where translation files were not generated.
- Allow build helper command to pass parameters.
- Allow translations of words within custom Verto templates.
- Update interactive template block names to avoid overriding.
- Add notes to documentation on writing custom Verto templates.
- Change recommended JavaScript indentation to 4 spaces from 2 spaces. Existing code has not be updated.
- Modify URL parameter decoder to accept equal signs within a parameter.
- Enable CORS headers for providing version information across domains.
- Add templatetag for reading file to template.
- Add syntax highlighting within code blocks.
- Change environment variable to allow wider Traefik router variations.
- Update SCSS division symbol away from deprecated '/' symbol.
- Update logging configuration.
- Add package-lock.json file.

- Core dependency changes:

  - Add django-cors-headers 3.11.0.
  - Add Pygments 2.11.2.
  - Update bootstrap from 4.6.0 to 4.6.1.
  - Update codemirror from 5.63.1 to 5.65.0.
  - Update coverage from 5.5 to 6.2.
  - Update crowdin/github-action from 1.4.0 to 1.4.7.
  - Update django from 3.2.8 to 3.2.12.
  - Update django-debug-toolbar from 3.2.2 to 3.2.4.
  - Update django-environ from 0.7.0 to 0.8.1.
  - Update django-statici18n from 2.0.1 to 2.2.0.
  - Update docker/build-push-action from 2.7.0 to 2.9.0.
  - Update docker/login-action from 1.10.0 to 1.13.0.
  - Update lxml from 4.6.3 to 4.8.0.
  - Update MathJax from 2.7.5 to 2.7.9.
  - Update Node 14.17.0 to 14.19.0.
  - Update postcss from 8.3.9 to 8.4.5.
  - Update psycopg2 from 2.9.1 to 2.9.3.
  - Update sass from 1.42.1 to 1.49.8.
  - Update selenium omfr 3.141.0 to 4.1.1.
  - Update sphinx from 4.2.0 to 4.4.0.
  - Update whitenoise from 5.3.0 to 6.0.0.
  - Update yargs from 17.2.1 to 17.3.1.

- Interactive bin-packing dependency changes:

  - Update interactjs from 1.4.0-alpha.17 to 1.10.11.

- Interactive box-rotation dependency changes:

  - Update three from 0.101.1 to 0.138.0.

- Interactive box-translation dependency changes:

  - Update three from 0.101.1 to 0.138.0.

- Interactive city-trip dependency changes:

  - Update cytoscape from 3.4.2 to 3.21.0.
  - Update cytoscape-automove from 1.10.1 to 1.10.3.

- Interactive colour-matcher dependency changes:

  - Update wnumb from 1.1.0 to 1.2.0.

- Interactive frequency-analysis dependency changes:

  - Update es5-shim from 4.5.12 to 4.6.5.
  - Update es6-shim from 0.35.4 to 0.35.6.

- Interactive jpeg-compression dependency changes:

  - Update dct from 0.0.3 to 0.1.0.
  - Update interactjs from 1.4.0-alpha.17 to 1.10.111.

- Interactive matrix-simplifier dependency changes:

  - Update dragula from 3.7.2 to 3.7.3.

- Interactive packet-attack dependency changes:

  - Update phaser from 3.16.2 to 3.55.2.

- Interactive python-interpreter dependency changes:

  - Update skulpt from 0.11.1 to 1.2.0.

- Interactive rsa-decryption dependency changes:

  - Update big-integer from 1.6.44 to 1.6.51.
  - Update node-rsa from 1.0.5 to 1.1.1.

- Interactive rsa-encryption dependency changes:

  - Update big-integer from 1.6.44 to 1.6.51.
  - Update node-rsa from 1.0.5 to 1.1.1.

- Interactive rsa-key-generator dependency changes:

  - Update node-rsa from 1.0.5 to 1.1.1.

- Interactive scene-editor dependency changes:

  - Update three from 0.108.0 to 0.138.0.

- Interactive sorting-algorithms dependency changes:

  - Update dragula from 3.7.2 to 3.7.3.

- Interactive unicode-binary dependency changes:

  - Update urijs from 1.19.1 to 1.19.8.
  - Update underscore.string from 3.3.5 to 3.3.6.

- Interactive viola-jones-face-detector dependency changes:

  - Update interactjs from 1.4.0 to 1.10.11.

3.8.5
==============================================================================

**Release date:** 6th October 2021

**Changelog:**

- Fix bug where interactives in chapters were not displaying.
- Redirect non-www requests to www subdomain at Traefik router.
- Run migration commands in existing container to allow access to created files.
- Remove Docker compose volumes to avoid issues with development.
- Dependency changes:

  - Update autoprefixer from 10.3.6 to 10.3.7.
  - Update codemirror from 5.62.3 to 5.63.1.
  - Update django from 3.2.7 to 3.2.8.
  - Update gulp-postcss from 2.0.1 to 2.1.0.
  - Update postcss from 8.3.6 to 8.3.9.
  - Update yargs from 17.1.1 to 17.2.1.

3.8.4
==============================================================================

**Release date:** 29th September 2021

**Changelog:**

- Allow greater customisation for the website's Traefik routing rule.

3.8.3
==============================================================================

**Release date:** 28th September 2021

**Changelog:**

- Rebuild search index when updating data, instead of application start.
- Modify configuration for Docker Swarm services to specify updatedata task.
- Dependency changes:

  - Update crowdin/github-action from 1.3.2 to 1.4.0.
  - Update autoprefixer from 10.3.2 to 10.3.6.
  - Update intro.js from 4.1.0 to 4.2.2.
  - Update sass from 1.38.0 to 1.42.1.
  - Update sphinx from 4.1.2 to 4.2.1.
  - Update sphinx-rtd-theme from 0.5.2 to 1.0.0.
  - Update django from 3.2.6 to 3.2.7.
  - Update django-environ from 0.4.5 to 0.7.0.
  - Update django-haystack[elasticsearch] from 3.0 to 3.1.1.

3.8.2
==============================================================================

**Release date:** 6th September 2021

**Changelog:**

- Modify network name for production deployments.

3.8.1
==============================================================================

**Release date:** 28th August 2021

**Changelog:**

- Fix encoding of JPG image that prevented minifying.
- Modify workflow to only produce production docker image run on published release.

3.8.0
==============================================================================

**Release date:** 25th August 2021

**Changelog:**

- Move website from Google Cloud Platform to Docker Swarm hosted at the University of Canterbury.  `#1380 <https://github.com/uccser/cs-field-guide/pull/1380>`__

  - Modifies website infrastructure to use Docker Swarm, running all website components as services.
  - Use GitHub actions for automated workflows. This includes testing, deployment, and internationalisation jobs.
  - Simplify static file pipeline, runs as separate service.

- Switch to GitHub dependency manager.
- New Depth section for Computer Vision chapter:

  - Includes new Depth from Stereo Vision interactive. `#1375 <https://github.com/uccser/cs-field-guide/pull/1375>`__

- Update Context-free Grammar interactive to always generate valid expressions via brute force, and improve the interface with a history log and consistent formatting.
- Allow Big Number Calculator to calculate numbers with low digit counts. `#1340 <https://github.com/uccser/cs-field-guide/pull/1340>`__
- Dependency changes:

    - Add ansi-colors 4.1.1.
    - Add browser-sync 2.27.5.
    - Add child_process 1.0.2.
    - Add cssnano 5.0.8.
    - Add django-bootstrap-breadcrumbs 0.9.2.
    - Add elasticsearch 5.5.3.
    - Add fancy-log 1.3.3.
    - Add got 11.8.2.
    - Add gulp-concat 2.6.1.
    - Add gulp-imagemin 7.1.0.
    - Add intro.js 4.1.0.
    - Add lity 2.4.1.
    - Add pixrem 5.0.0.
    - Add postcss 8.3.6.
    - Add sass 1.38.0.
    - Add whitenoise 5.0.3.
    - Remove @babel/core 7.1.2
    - Remove @babel/preset-env 7.1.0
    - Remove del 3.0.0
    - Remove featherlight 1.7.13
    - Remove gevent 1.4.0.
    - Remove gulp-babel 8.0.0
    - Remove gulp-jshint 2.1.0
    - Remove gulp-notify 3.2.0
    - Remove gulp-util 3.0.8
    - Remove gulplog 1.0.0
    - Remove gumshoejs 5.1.2
    - Remove jshint 2.9.6.
    - Remove jshint-stylish 2.2.1.
    - Remove node-gyp 3.8.0
    - Remove Pillow 7.2.0.
    - Remove request 2.88.0
    - Remove run-sequence 2.2.1
    - Remove sticky-state 2.4.1
    - Remove wheel 0.35.1.
    - Remove Whoosh 2.7.4.
    - Update autoprefixer from 9.3.1 to 10.3.2.
    - Update bootstrap from 4.3.1 to 4.6.0.
    - Update browserify from 16.2.2 to 17.0.0.
    - Update codemirror from 5.42.0 to 5.62.3.
    - Update coverage from 5.3 to 5.5.
    - Update details-element-polyfill from 2.3.1 to 2.4.0.
    - Update django from 2.2.3 to 3.2.6.
    - Update django-debug-toolbar from 3.1.1 to 3.2.2.
    - Update django-haystack 3.0 to django-haystack[elasticsearch] 3.0.
    - Update django-modeltranslation from 0.15.2 to 0.17.3.
    - Update django-statici18n from 1.9.0 to 2.0.1.
    - Update flake8 from 3.8.4 to 3.9.2
    - Update gulp from 3.9.1 to 4.0.2.
    - Update gulp-filter from 5.1.0 to 7.0.0.
    - Update gulp-if from 2.0.2 to 3.0.0.
    - Update gulp-postcss from 7.0.1 to 9.0.0.
    - Update gulp-rename from 1.4.0 to 2.0.0.
    - Update gulp-sass from 4.0.2 to 5.0.0.
    - Update gulp-sourcemaps from 2.6.4 to 3.0.0.
    - Update gulp-tap from 1.0.1 to 2.0.0.
    - Update gulp-terser from 1.1.5 to 2.0.1.
    - Update gunicorn from 19.9.0 to 20.1.0.
    - Update iframe-resizer from 4.1.1 to 4.3.2.
    - Update jquery from 3.4.1 to 3.6.0.
    - Update lxml from 4.6.2 to 4.6.3.
    - Update multiple-select from 1.2.1 to 1.5.2.
    - Update popper.js from 1.15.0 to 1.16.1.
    - Update postcss-flexbugs-fixes from 4.1.0 to 5.0.2.
    - Update Postgres database from 9.6 to 13.3.
    - Update psycopg2 from 2.7.6.1 to 2.9.1.
    - Update puppeteer from 1.9.0 to Docker image 10.0.0.
    - Update pydocstyle from 5.1.1 to 6.1.1.
    - Update PyYAML from 5.3.1 to 5.4.1.
    - Update sphinx from 3.3.0 to 4.1.2.
    - Update sphinx-rtd-theme from 0.5.0 to 0.5.2.
    - Update uniseg from 0.7.1 to 0.7.1.post2.
    - Update verto 0.11.0 to 1.0.1.
    - Update yargs from 12.0.2 to 17.1.1.

3.7.0
==============================================================================

**Release date:** 2nd February 2021

**Changelog:**

- Add context-free grammar interactive. `#1364 <https://github.com/uccser/cs-field-guide/pull/1364>`__
- Update the list of editors. `#1361 <https://github.com/uccser/cs-field-guide/pull/1361>`__

3.6.0
==============================================================================

**Release date:** 11th January 2021

**Changelog:**

- Improve consistency of the URL parameters for the RGB Mixer interactive: `#1309 <https://github.com/uccser/cs-field-guide/pull/1309>`__
- Update CMY Mixer interactive to be consistent with RGB Mixer: `#1306 <https://github.com/uccser/cs-field-guide/issues/1306>`__
- Improve limitations of the Algorithm Timer interactive: `#1332 <https://github.com/uccser/cs-field-guide/issues/1332>`__
- Replace broken link in the HCI chapter: `#1316 <https://github.com/uccser/cs-field-guide/issues/1316>`__
- Fix typos: `#1320 <https://github.com/uccser/cs-field-guide/issues/1320>`__ `#1358 <https://github.com/uccser/cs-field-guide/issues/1358>`__
- Dependency updates:

    - Update lxml from 4.5.2 to 4.6.2.
    - Update wheel from 0.34.2 to 0.35.1.
    - Update django-haystack from 2.8.1 to 3.0.
    - Update django-modeltranslation from 0.15.1 to 0.15.2.
    - Update sphinx from 3.1.2 to 3.3.0.
    - Update django-debug-toolbar from 2.2 to 3.1.1.
    - Update flake8 from 3.8.3 to 3.8.4.
    - Update pydocstyle from 5.0.2 to 5.1.1.
    - Update coverage from 5.2.1 to 5.3.

3.5.1
==============================================================================

**Release date:** 1st August 2020

**Changelog:**

- Add URL redirects for CS Unplugged Pixelmania activity. `#1303 <https://github.com/uccser/cs-field-guide/issues/1303>`__
- Update Pixel Viewer interactive: `#1300 <https://github.com/uccser/cs-field-guide/pull/1300>`__  `#1302 <https://github.com/uccser/cs-field-guide/issues/1302>`__ `#1304 <https://github.com/uccser/cs-field-guide/pull/1304>`__

    - Add brightness value mode.
    - Add ability to zoom to specific starting point for an image.
    - Set image when zooming to be pixelated (only on modern browsers).
    - Add parameter to hide mode selector.
    - Add parameter to hide value type selector.
    - Add parameter to show Pixelmania branding.

- Update RGB Mixer interactive: `#1305 <https://github.com/uccser/cs-field-guide/pull/1305>`__

    - Show full value of colour in mixed colour.
    - Add parameter to show Pixelmania branding and force hexadecimal notation.

- Fix incorrect hexadecimal value in content.
- Dependency updates:

    - Update lxml from 4.5.1 to 4.5.2.
    - Update django-modeltranslation from 0.15 to 0.15.1.
    - Update sphinx from 3.1.1 to 3.1.2.
    - Update coverage from 5.1 to 5.2.1.

3.5.0
==============================================================================

**Release date:** 7th July 2020

**Changelog:**

- Add ability to show colour codes in Hexadecimal on the Pixel Viewer interactive. `#1277 <https://github.com/uccser/cs-field-guide/issues/1277>`__
- Add Hexadecimal version of colour mixer interactives. `#1290 <https://github.com/uccser/cs-field-guide/issues/1290>`__
- Dependency updates:

  - Update Pillow from 7.1.2 to 7.2.0.
  - Update sphinx-rtd-theme from 0.4.3 to 0.5.0.

3.4.0
==============================================================================

**Release date:** 1st July 2020

**Changelog:**

- Allow user to choose number of cards shown in the Binary Cards interactive, plus fit cards in groups of 8 on large screens. `#1262 <https://github.com/uccser/cs-field-guide/issues/1262>`__ `#1271 <https://github.com/uccser/cs-field-guide/issues/1271>`__
- Fix issues in LZSS Compression algorithm, expand its functionality, and replace space characters with the open box character for clarity. `#1271 <https://github.com/uccser/cs-field-guide/issues/1271>`__ `#1285 <https://github.com/uccser/cs-field-guide/pull/1285>`__
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

**Release date:** 22nd April 2020

**Changelog:**

- Solved bug in pixel viewer that was affecting some users. `#1254 <https://github.com/uccser/cs-field-guide/pull/1254>`__
- Dependency updates:

  - Update Pillow from 6.2.1 to 7.1.1.
  - Update PyYAML from 5.2 to 5.3.1.

3.3.0
==============================================================================

**Release date:** 26th December 2019

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

**Release date:** 16th October 2019

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

**Release date:** 7th October 2019

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

**Release date:** 6th September 2019

**Changelog:**

- Fix broken URLs. `#1141 <https://github.com/uccser/cs-field-guide/issues/1141>`__

3.0.4
==============================================================================

**Release date:** 5th September 2019

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

**Release date:** 24th July 2019

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

**Release date:** 18th July 2019

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

**Release date:** 3rd July 2019

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

**Release date**: 30th June 2019

**Changelog:**

- Rebuild the Computer Science Field Guide website to use an open source Django system based off CS Unplugged (`see the GitHub milestone <https://github.com/uccser/cs-field-guide/milestone/17>`__). Major features include:

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

**Release date:** 5th June 2018

**Changelog:**

- Add optional parameters to Pixel Viewer interactive to specific starting image, hide pixel fill, and hide menu. `#630 <https://github.com/uccser/cs-field-guide/pull/630>`__
- Grammar/spelling fixes for Data Representation and Compression Coding chapters. `#626 <https://github.com/uccser/cs-field-guide/pull/626>`__

2.12.1
==============================================================================

**Release date:** 7th March 2018

**Changelog:**

- Update Artificial Intelligence chapter to use shorter introduction video.
- Update Unicode Binary interactive to display UTF mode.
- Bugfixes for Sorting/Searching Boxes interactives.
- Grammar/spelling fixes for HCI chapter.
- Correct quote by Mike Fellows in Introduction chapter.

2.12.0
==============================================================================

**Release date:** 13th February 2018

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

**Release date:** 18th October 2017

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

**Release date:** 3rd September 2017

**Changelog:**

- Fix broken links to NCEA curriculum guides. `#483 <https://github.com/uccser/cs-field-guide/issues/483>`__
- Fix broken link to research paper. `#484 <https://github.com/uccser/cs-field-guide/issues/484>`__
- Fix panels showing 'None' as title. `#485 <https://github.com/uccser/cs-field-guide/issues/485>`__

2.10.0
==============================================================================

**Release date:** 2nd September 2017

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

**Release date:** 20th February 2017

**Notable changes:**

This release fixes a bug in the Computer Graphics chapter where some links to the 2D Arrow Manipulation interactives were broken due to an incorrect regex.

**Changelog:**

- `Adam Gotlib <https://github.com/Goldob>`__ `#404 <https://github.com/uccser/cs-field-guide/pull/404>`__

2.9.0
==============================================================================

**Release date:** 27th January 2017

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

**Release date:** 21st October 2016

**Changelog:**

- Update introduction chapter. `#231 <https://github.com/uccser/cs-field-guide/issues/231>`__
- Add notice of changes to AP-CSP curriculum in Fall 2016 release.
- Skip parsing `#` characters at start of Markdown links.

2.8.0
==============================================================================

**Release date:** 19th October 2016

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

**Release date:** 5th September 2016

**Notable changes:**

- Fixed broken link in footer to contributors page.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.7.0...v2.7.1>`__

2.7.0
==============================================================================

**Release date:** 23rd August 2016

**Notable changes:**

**New video:** Formal Languages now has an introductory video.
**New interactive:** The [hexadecimal background colour interactive interactives/hex-background-colour/index.html) allows a user to change the background colour of the page.
**New curriculum guide:** A guide for NCEA `Artificial Intelligence: Turing Test <https://docs.google.com/document/d/1TnP0sCW33Yhy4wQITDre1sirB0IonesCfdbO0WqJjow>`__ has been added.
**Updated interactives:** The `box translation <interactives/box-translation/index.html>`__ and `box rotation <interactives/box-rotation/index.html>`__ interactives are now open source and have been given a new look and made mobile friendly.
**Generation improvements:** Basic translation support. Settings are now specific to each language, and contain the translation text.
**Website improvements:** Added `help guide <further-information/interactives.html>`__ for WebGL interactives.
- Also includes bug fixes to interactives, new links to supporting videos, and various text corrections from our staff and contributors.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.6.1...v2.7.0>`__

2.6.1
==============================================================================

**Release date:** 14th July 2016

**Notable changes:**

- Fixed issue on Human Computer Interaction chapter where duplicate library was causing several UI elements to not behave correctly.

2.6.0
==============================================================================

**Release date:** 16th June 2016

**Notable changes:**

**New feature:** PDF output - A downloadable PDF of both student and teacher versions is now available from the homepage. The PDF also functions well as an ebook, with functional links to headings, glossary entries, interactives, and online resources.
**New feature:** Printer friendly webpages - When printing a page of the CSFG through a browser, the page displays in a printer friendly manner by hiding navigational panels, opening all panels, and providing extra links to online resources.
**New interactive:** The `binary cards interactive <interactives/binary-cards/index.html>`__ emulates the Binary Cards CS Unplugged activity, used to teach binary numbers.
**New interactive:** The `high score boxes interactive <interactives/high-score-boxes/index.html>`__ was developed to give an example of searching boxes to find a maximum value to the student.
**New interactive:** The `action menu interactive <interactives/action-menu/index.html>`__ is a small dropdown menu with one option that has severe consequences, but no confirmation screen if the user selects that option (used to demonstrate a key HCI concept).
**Updated interactive:** The `trainsylvania interactive <interactives/trainsylvania/index.html>`__ (and supporting images/files) have been given a fresh coat of colour and a new station name.
**Updated interactive:** The `trainsylvania planner <interactive interactives/trainsylvania-planner/index.html>`__ is used alongside the trainsylvania interactive, and allows the user to input a path of train trips to see the resulting destination.
**Updated interactive:** The `base calculator <interactives/base-calculator/index.html>`__ allows a student to calculate a number, using a specific number base (binary, hexadecimal, etc).
**Updated interactive:** The `big number calculator <interactives/big-number-calculator/index.html>`__ allows a student to perform calculations with very large numbers/results.
**Website improvements:** Redesigned homepage and footer with useful links and a splash of colour. Math equations are now line wrapped, and MathJax is loaded from a CDN. Images can now have text wrapped around them on a page.
**Generation improvements:** Improvements to internal link creation (glossary links in particular). Separated dependency installation from generation script (see documentation for how to install and run generation script).
**Project improvements:** Added documentation for contributing to and developing this project, including a code of conduct.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.5.0...v2.6.0>`__

2.5.0
==============================================================================

**Release date:** 13th May 2016

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

**Release date:** 29th April 2016

**Notable changes:**

- Fixed version numbering system to allow hotfix changes

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.4...v2.4.1>`__

2.4
==============================================================================

**Release date:** 29th April 2016

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

**Release date:** 10th March 2016

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

**Release date:** 19th February 2016

**Notable changes:**

- New interactive: Parity trick with separate modes for `practicing setting parity <interactives/parity/index.html?mode=set>`__, `practicing detecting parity <interactives/parity/index.html?mode=detect>`__, and `the whole trick <interactives/parity/index.html>`__. Also has a `sandbox mode <interactives/parity/index.html?mode=sandbox>`__.
- Updated interactives: Two colour mixers, one for `RGB <interactives/rgb-mixer/index.html>`__ and one for `CMY <interactives/cmy-mixer/index.html>`__ have been added.
- Updated interactive: A `colour matcher interactive <interactives/colour-matcher/index.html>`__ has been added for matching a colour in both 24 bit and 8 bit.
- Updated interactive: A `python interpreter interactive <interactives/python-interpreter/index.html>`__ has been added for the programming languages chapter.
- Website improvements: Code blocks now have syntax highlighting when a language is specified, dropdown arrows are fixed in Mozilla Firefox browsers, and whole page interactives now have nicer link buttons.

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.1...v2.2>`__

2.1
==============================================================================

**Release date:** 12th February 2016

**Notable changes:**

- Fixed many broken links and typos from 2.0.0
- Added calculator interactives to Introduction
- Added RSA key generator to Encryption
- Rewritten Braille Section in Data Representation

A full list of changes in this version is `available on GitHub <https://github.com/uccser/cs-field-guide/compare/v2.0...v2.1>`__

2.0
==============================================================================

**Release date:** 5th February 2016

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

**Release date:** 29th January 2016

2.0-alpha.2
==============================================================================

**Release date:** 25th January 2016

2.0-alpha.1
==============================================================================

**Release date:** 2nd December 2015

**Comments:**
Released at CS4HS 2015.

1.?.?
==============================================================================

**Release date:** 3rd February 2015

**Comments:**

The last version of the CSFG before the open source version was adopted.
