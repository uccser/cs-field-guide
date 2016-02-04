# Development Process

This document aims to show the process used in developing the Computer Science Field Guide.

## Creating a release

Here is the process used for creating a CSFG release.

1. [Create a release branch](http://nvie.com/posts/a-successful-git-branching-model/#creating-a-release-branch). Checkout to this branch.
2. Update the version number within the `generator-settings.conf`. Details on the numbering system is stored within the releases page.
3. Check logs for errors, how content is displayed (especially conditional content), and command line parameters. Fix any issues that arise, or [log an issue](https://github.com/uccser/cs-field-guide/issues/new).
4. Detail the changes on the `further-information/releases.md` page. This includes moving older versions to their new folders.
5. Merge the release branch onto the `master` branch and push the changes.
5. Merge the release branch onto the `develop` branch and push the changes.
6. Create the release on [GitHub](https://github.com/uccser/cs-field-guide/releases/).
7. Announce release on [CSFG teachers group](https://groups.google.com/forum/?fromgroups#!forum/csfg-teachers).
8. Delete the release branch.
