# Contributing Guide

Welcome to the Computer Science Field Guide (CSFG) developer community! We have spent many years creating the CSFG, and we would love for you to get involved into making this guide as great as possible!
The following is a set of guidelines for contributing to the CSFG hosted on GitHub. These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  - [Code of Conduct](#code-of-conduct)
  - [Project Overview](#project-overview)

[I want to contribute! Where do I start?](#i-want-to-contribute-where-do-i-start)
  - [Reporting issues](#reporting-issues)
  - [Making suggestions](#making-suggestions)
  - [Your first code contribution](#your-first-code-contribution)
  - [Pull requests](#pull-requests)

[Style guides](#style-guides)
  - [Git](#git)
  - [Project structure](#project-structure)
  - [Programming](#programming)

[Additional notes](#additional-notes)
  - [Managing licenses](#managing-licenses)
  - [Creating a release](#code-a-release)

## What should I know before I get started?

### Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.
Please report unacceptable behavior to [admin@csfieldguide.org.nz](mailto:admin@csfieldguide.org.nz)

### Project Overview

The Computer Science Field Guide (CSFG) is an online interactive resource for students learning about computer science.
The project contains several components:

- **Text** for chapters, curriculum guides, and other pages.
- **Images** used within the guide.
- **Interactive** learning examples/demostations/games.
- **Files** for downloading (for example: PDFs, spreadsheets, code examples).

These are then put through our **generator** which reads a series of **settings files** and creates **HTML output**, currently in a website format.

There are many possible areas you can contribute, including:

- Suggesting a text edit for a typo, grammar correction, or just clearing up a point.
- Adding a new or replacement image for a chapter.
- Adding or modifying an interactive for the guide.
- Adding a translation for a chapter or interactive.
- Modifying the HTML generator.

## I want to contribute! Where do I start?

Have a look at the following sections on how to contribute, and feel free to ask any questions on the [public chatroom for the CSFG on Gitter](https://gitter.im/uccser/cs-field-guide).

### Reporting issues

This section guides you through submitting an issue for the CSFG.
Following these guidelines helps maintainers and the community understand your findings.

Before creating an issue, please check [this list](#before-submitting-an-issue) as you might find out that you don't need to create one.
When you are creating an issue, please [include as many details as possible](#how-do-i-submit-a-good-issue).

#### Before submitting an issue

- **Search the [issue tracker](https://github.com/uccser/cs-field-guide/issues?utf8=%E2%9C%93&q=is%3Aissue)** to see if the issue has already been reported. If it has, add a comment to the existing issue (even if the issue is closed) instead of opening a new one.

#### How do I submit a (good) issue?

Issues are tracked in the GitHub issue tracker (if you've never used GitHub issues before, read this [10 minute guide to become a master](https://guides.github.com/features/issues/)).
When creating an issue, provide the following information.

Explain the problem and include additional details to help maintainers understand or reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Clearly and concisely describe the issue** and provide screenshots if required.
- **Link any related existing issues**.
- **Apply relevant labels** for easier management by project maintainer.

If the issues is a code related issue, also include the following:

- **Describe the exact steps which reproduce the problem** in as many details as possible. For example, how you were using an interactive. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you moved the cursor to the end of a line, explain if you used the mouse or a keyboard shortcut.
- **Explain which behavior you expected to see instead and why.**
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.
- **Include screenshots and animated GIFs** if it helps explain the issue you encountered.
- **What's the name and version of the OS you're using**?
- **What's the name and version of the browser you're using**?
- **If the problem is related to performance**, please provide specifications of your computer

### Making suggestions

This section guides you through submitting an enhancement suggestion for the CSFG, including completely new chapters of text to minor improvements of existing interactives. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-suggestion) as you might find out that you don't need to create one. When you are creating an suggestion, please [include as many details as possible](#how-do-i-submit-a-good-suggestion).

#### Before submitting an suggestion

- **Search suggestions in the [issue tracker](https://github.com/uccser/cs-field-guide/issues?q=is%3Aissue+label%3Asuggestion)** to see if the suggestion has already been suggested. If it has, add a comment to the existing suggestion (even if the suggestion is closed) instead of opening a new one.

#### How do I submit a (good) suggestion?

Issues are tracked in the GitHub issue tracker (if you've never used GitHub issues before, read this [10 minute guide to become a master](https://guides.github.com/features/issues/)).
When creating an issue, provide the following information.

Explain the problem and include additional details to help maintainers understand or reproduce the problem:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Clearly and concisely describe the suggestion** and provide screenshots if required.
- **Explain why this suggestion would be useful** to most CSFG users and isn't something that should be a implemented as a community variant of the CSFG.
- **Link any related existing suggestions**.
- **Apply relevant labels** for easier management by project maintainer.

### Your first code contribution

Unsure where to begin contributing to CSFG? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues](https://github.com/uccser/cs-field-guide/labels/beginner) - issues which should only require a few lines of text or code.
* [Help wanted issues](https://github.com/uccser/cs-field-guide/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

### Pull requests

- Include a detailed explaination of the proposed change, including screenshots and animated GIFs in your pull request whenever possible.
- Read and applied the [style guides listed below](#style-guides).
- Your pull request should be on a new branch from our `develop` branch (unless it's something tiny like a typo). The naming conventions of branches should be descriptive of the new addition/modification. Ideally they would specify their namespace as well, for example:
  - `interactive/deceiver`
  - `guide_content/data_representation`
  - `issue/234`
- Linked any relevant [existing issues/suggestions](https://github.com/uccser/cs-field-guide/issues).
- Applied the relevant labels for this pull request.
- Run the generation script and checked the output is as expected (be sure to run with various optional parameters, for example, teacher output).
- Added necessary documentation (if appropriate).

## Style guides

### Git

- Commits should be as descriptive as possible. Other developers (and even future you) will thank you for your forethought and verbosity for well documented commits. [Ideally follow this commit structure](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), otherwise in short:
  - Limit the first line to 72 characters or less
  - Reference issues and pull requests liberally
  - Use the present tense ("Add feature" not "Added feature")
  - Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Use [Vincent Driessen's Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/) for managing development. Please read this document to understand our branching methods.

### Project structure

- Folders should be all lowercase with dashes for spaces.
- Folders and files should use full words when named, however the JavaScript, CSS, and image folders within interactive folders can be named `js`, `css`, and `img` respectively.

### Programming

> Every line of code should appear to be written by a single person, no matter the number of contributors.

These are our abridged guidelines for working on code within this repository:
- Code should be easily readable (avoid abbreviations etc)
- Files should be set to `utf-8`, use `lf` line endings, and have a final newline at the end of a file.
- A file should begin with a comment listing main author, and purpose.
- Functions should have comments/docstrings explaining their purpose.
- Indents should be spaces (not tab characters)
- Indent sizes:
  - HTML: 2 spaces
  - CSS/SCSS: 2 spaces
  - JavaScript: 4 spaces
  - Python: 4 spaces

For more detailed specifications (including naming conventions, declaration order), we aim to follow these guides:
- [HTML style guide](http://codeguide.co/#html)
- [CSS style guide](http://codeguide.co/#css)
- [JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [Python style guide](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html)


## Additional notes

### Managing licenses

Our project deals with a large variety of materials with various licenses, some of which are used multiple times throughout the project. Instead of managing multiple license files, we have opted to storing all license information in one file (which is sent through our parser and displayed in the HTML output).

- Files used should be listed in `text/en/further-information/included-files.md`.
- Details on how to add license information is found at the top of this file.

### What software do you use?

We use a variety of software for developing the CSFG, but here are some of our favourites:

- We use [Atom Editor](https://atom.io/) for modifying both text and code files ([Sublime Text](https://www.sublimetext.com/) is also popular too).
- We use a private [Slack](https://slack.com/) for planning and discussing topics as a team.
- We use a public [Gitter chatroom](https://gitter.im/uccser/cs-field-guide) for chatting to contributors.
- Most of us use [Google Chrome's developers tools](https://developers.google.com/web/tools/chrome-devtools/?hl=en) for testing and debugging our interactives and website design.
- And lastly, we use [Git](https://git-scm.com/) and [GitHub](https://github.com/) for managing version control.

### Creating a release

This is our current process for creating and publishing a CSFG release.

1. [Create a release branch](http://nvie.com/posts/a-successful-git-branching-model/#creating-a-release-branch). Checkout to this branch.
2. Update the version number within the `generator-settings.conf`. Details on the numbering system is stored within the releases page.
3. Check logs for errors, how content is displayed (especially conditional content), and command line parameters. Fix any issues that arise, or [log an issue](https://github.com/uccser/cs-field-guide/issues/new).
4. Detail the changes on the `further-information/releases.md` page. This includes moving older versions to their new folders (if required) and creating links to their backups. New contributors should also be added to `further-information/contributors.md`.
5. [Complete the release branch](http://nvie.com/posts/a-successful-git-branching-model/#finishing-a-release-branch). Be sure to tag the release with the version number for creating the release on GitHub.
6. Create the release on [GitHub](https://github.com/uccser/cs-field-guide/releases/) on the tagged commit.
7. Upload a new version of the CSFG to our webserver.
8. Announce release on [CSFG teachers group](https://groups.google.com/forum/?fromgroups#!forum/csfg-teachers).
