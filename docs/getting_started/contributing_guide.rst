Contributing Guide
##############################################################################

This page lists a set of guidelines for contributing to the project.
These are just guidelines, not rules, use your best judgment and feel
free to propose changes to this document in a pull request.

Reporting Issues and Making Suggestions
==============================================================================

This section guides you through submitting an issue or making a suggestion
for the CS Unplugged project.
Following these guidelines helps maintainers and the community understand
your findings.

Before Submitting an Issue
------------------------------------------------------------------------------

- `Search the issue tracker for the issue/suggestion`_ to see if it has
  already been logged.
  If it has, add a comment to the existing issue (even if the issue is closed)
  instead of opening a new one.

How do I Submit a Good Issue or Suggestion?
------------------------------------------------------------------------------

Issues are tracked in the GitHub issue tracker (if you've never used
GitHub issues before, read this `10 minute guide to become a master`_).
When creating an issue, explain the problem and include additional details to
help maintainers understand or reproduce the problem:

For Reporting an Issue
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Clearly and concisely describe the issue** and provide screenshots if
  required.
- **Link any related existing issues**.

If the issues is a code related issue, also include the following:

- **Describe the exact steps which reproduce the problem** in as many details
  as possible.
  For example, how you were generating a resource.
  When listing steps, **don't just say what you did, explain how you did it**.
- **Explain which behavior you expected to see instead and why.**
- **Describe the behavior you observed after following the steps** and point
  out what exactly is the problem with that behavior.
- **Can you reliably reproduce the issue?** If not, provide details about
  how often the problem happens and under which conditions it normally happens.
- **Include screenshots or animated GIFs** if it helps explain the issue you
  encountered.
- **What's the name and version of the OS you're using?**
- **What's the name and version of the browser you're using?**
- **If the problem is related to performance**, please provide
  specifications of your computer.

For Making a Suggestion
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Explain the suggestion and include additional details to help maintainers
understand the changes:

- **Use a clear and descriptive title** for the issue to identify the
  suggestion.
- **Clearly and concisely describe the suggestion** and provide screenshots if
  required.
- **Explain why this suggestion would be useful** to most CS Unplugged users
  and isn't something that should be a implemented as a community variant of
  the project.
- **Link any related existing suggestions**.

.. note::

    **Internal Staff Only:** Assigning Issues

    Our policy is to only assign a person to an issue when they are actively
    working on the issue.
    Please don't assign yourself when you *plan* to do the task (for example:
    in the next few days), assign yourself when you begin work.
    This allows other team members to clearly see which tasks are available
    to be worked on.

Your First Code Contribution (pull request)
==============================================================================

Unsure where to begin contributing to CS Unplugged?
You can start by looking through the `issue tracker`_.

Pull Requests
------------------------------------------------------------------------------

- **Include a detailed explaination** of the proposed change, including
  screenshots and animated GIFs in your pull request whenever possible.
- **Read and apply the style guides** listed below.
- Your pull request should be on a new branch from our ``develop`` branch,
  **that is being requested to merge back into** ``develop``.
  The naming conventions of branches should be descriptive of the new
  addition/modification.
  Ideally they would specify their namespace as well, for example:

  - ``resource/puzzle-town``
  - ``topic/algorithms``
  - ``issue/234``

- Link to any relevant existing issues/suggestions.
- Add necessary documentation (if appropriate).

We aim to keep the CS Unplugged project as robust as possible, so please do
your best to ensure your changes won't break anything!

Style and Etiquette Guides
==============================================================================

Git
------------------------------------------------------------------------------

- Commits should be as descriptive as possible.
  Other developers (and even future you) will thank you for your forethought
  and verbosity for well documented commits.
  Generally:

  - Limit the first line to 72 characters or less
  - Reference issues and pull requests liberally

- We use `Vincent Driessen's Git Branching Model <http://nvie.com/posts/a-successful-git-branching-model/>`_
  for managing development.
  Please read this document to understand our branching methods, and how
  to perform clear branches and merges.

  Specifically for our respository:

    - We create a new branch for each task of work, no matter how small it is.
    - We create the branch off the ``develop`` branch.
    - In general, the new branch should begin with ``issue/`` followed by
      the issue number.
    - When a branch is completed, a pull request is created on GitHub for
      review.
    - Branches are merged back into ``develop``.

GitHub
------------------------------------------------------------------------------

.. note::

    Internal Staff Only

- Mention a user (using the ``@`` symbol) when an issue is relevant to them.
- Only assign yourself to an issue, when you are actively working on it.
- The technical team may tag an author to review specific pull requests, and as
  a reviewer you can either approve, request changes, or just leave comments.
- A pull request requires one review approval to be merged.
- If multiple people are tagged as reviewers, we only need one review (unless
  otherwise specified).
  For example: For content changes, we ask that at least one member from each
  of the content and technical teams reviews the pull request.
- The creator of the pull request should assign all those suitable for review.
- The creator of the pull request is the only person who should merge the pull
  request.
  If you approve a pull request and it shows the big green button, please
  resist clicking it!

Project Structure
------------------------------------------------------------------------------

- Directories should be all lowercase with dashes for spaces.
- Directories and files should use full words when named, however JavaScript,
  CSS, and image directories can be named ``js/``, ``css/``, and ``img/``
  respectively.

Text (Markdown)
------------------------------------------------------------------------------

- Each sentence should be started on a newline (this greatly improves
  readability when comparing two states of a document).

Programming
------------------------------------------------------------------------------

Quote from Google style guides:

  Be consistent.

  If you’re editing code, take a few minutes to look at the code around you
  and determine its style.
  If they use spaces around all their arithmetic operators, you should too.
  If their comments have little boxes of hash marks around them, make your
  comments have little boxes of hash marks around them too.

  The point of having style guidelines is to have a common vocabulary of coding
  so people can concentrate on what you’re saying rather than on how you’re
  saying it.
  We present global style rules here so people know the vocabulary, but local
  style is also important.
  If code you add to a file looks drastically different from the existing code
  around it, it throws readers out of their rhythm when they go to read it.
  Avoid this.

We aim to abide by the following style guides:

- **Python** - We follow `PEP8`_ except for one change of line length.
  `Django recommends allowing 119 characters`_, so we use this as our line
  length limit.
  This style is enforced by the `flake8`_ style checker.
- **HTML** - We follow the `open source HTML style guide`_ by @mdo.
- **CSS** - We follow the `open source CSS style guide`_ by @mdo.
- **JavaScript** - We follow the `Google JavaScript style guide`_.

Licencing
------------------------------------------------------------------------------

Any third-party libraries or packages used within this project should have
their listed within the ``LICENCE-THIRD-PARTY`` file, with a full copy of the
licence available within the ``third-party-licences`` directory.

Final Comments
==============================================================================

After reading the sections above, you should be able to answer the following
questions:

- When do I create a issue and how do I describe it?
- When and how do I create a new Git branch to work on?
- *Internal staff only:* When do I assign myself to an issue?

.. _Search the issue tracker for the issue/suggestion: https://github.com/uccser/cs-unplugged/issues?utf8=%E2%9C%93&q=is%3Aissue
.. _10 minute guide to become a master: https://guides.github.com/features/issues/
.. _issue tracker: https://github.com/uccser/cs-unplugged/issues
.. _PEP8: https://www.python.org/dev/peps/pep-0008/
.. _Django recommends allowing 119 characters: https://docs.djangoproject.com/en/dev/internals/contributing/writing-code/coding-style/
.. _open source HTML style guide: http://codeguide.co/#html
.. _open source CSS style guide: http://codeguide.co/#css
.. _Google JavaScript style guide: https://google.github.io/styleguide/javascriptguide.xml
.. _flake8: http://flake8.pycqa.org/en/latest/
