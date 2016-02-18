# Documentation

Welcome to the CSFG developer community! We have spent many years creating the CSFG, and we would love the community to get involved into making this guide as great as possible! These documents aim to inform you on how you can contribute to our project, while maintaining project style and uniformity. There are many possible areas you can contribute, including:

- Suggesting a text edit for a typo, grammar correction, or just clearing up a point.
- Adding a translation for a chapter or interactive.
- Adding a new or replacement image for a chapter.
- Adding or modifying an interactive for the guide.

You can even create a copy to generate your own version of the CSFG.

## Quick links

- [Project style guide](style-guide.md)
- [Text syntax](writing-text.md)

## Pull requests

We welcome pull requests for changes to the CSFG. We use [Vincent Driessen's Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/) for managing development, and we have set the default branch on GitHub as `develop` to make pull requests as easy to possible.

## Frequently asked questions

### What language is your text written in?

We use Markdown as a starter language for our text, as it has a great balance between readability and powerful features (we originally used Sphinx but moved to Markdown for it's readability). We have our own syntax added on the existing Markdown language to add extra features like teacher only panels, adding interactives, and much more. All the

### I want to report a typo or make a suggestion

There are two possible ways to do this:
1. If you already have a GitHub account, please [log an issue](https://github.com/uccser/cs-field-guide/issues) (but do a quick search the issue doesn't exist already!) and label it appropriately (e.g. add the suggestion label if you're logging an idea).
2. If you don't have a GitHub account, [log your feedback in our form here](https://docs.google.com/forms/d/1gCOwTMAd6idaeIRwvIELARfQsyL6lpI5P4EQa9bIW9w/viewform).

### What is involved in making a release?

Here is the process used for creating a CSFG release.

1. [Create a release branch](http://nvie.com/posts/a-successful-git-branching-model/#creating-a-release-branch). Checkout to this branch.
2. Update the version number within the `generator-settings.conf`. Details on the numbering system is stored within the releases page.
3. Check logs for errors, how content is displayed (especially conditional content), and command line parameters. Fix any issues that arise, or [log an issue](https://github.com/uccser/cs-field-guide/issues/new).
4. Detail the changes on the `further-information/releases.md` page. This includes moving older versions to their new folders.
5. Create a [pull request on GitHub](https://github.com/uccser/cs-field-guide/compare) to merge the release branch into master, and merge once approved. Or merge the release branch onto the `master` branch locally and push the changes.
6. Merge the release branch onto the `develop` branch and push the changes.
7. Upload a new version of the CSFG to the webserver.
8. Create the release on [GitHub](https://github.com/uccser/cs-field-guide/releases/).
9. Announce release on [CSFG teachers group](https://groups.google.com/forum/?fromgroups#!forum/csfg-teachers).
10. Delete the release branch.
