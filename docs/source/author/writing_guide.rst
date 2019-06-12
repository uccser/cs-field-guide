Writing Guide
##############################################################################

The majority of our text content is written in Markdown, and we also developed
a program called `Verto`_ to allow you to include HTML elements like images and
videos with simple text tags.

For example, the following text:

.. code-block:: none

  {panel type="teacher-note"}

  # This section contains extension material

  This section is an extension aimed at keen students.
  Primary school kids have been able to understand many of these ideas, although it really depends on how engaged the students are with the material.

  {panel end}

will display as the following on the website:

.. image:: ../_static/img/teacher_note.png
  :alt: An image showing the above Markdown syntax rendered as HTML

.. note::

  If you already know Markdown syntax, please remember the following project
  preferences (for consistency and readability):

  - Use asterisks (``*``) for emphasis, instead of underscores.
  - Use hyphens (``-``) for unordered lists.
  - No HTML within text files, we use Verto text tags to add iframes,
    images, videos, etc.

Below is a basic guide to syntax for Markdown and Verto text tags.
When viewing Verto documentation for a tag, the top of the page will detail how to use the tag in a basic example.
Some text tags also have required and/or optional tag parameters for further configuration.

.. contents:: Text Syntax
  :local:

------------------------------------------------------------------------------

Blockquotes
==============================================================================

.. code-block:: none

  > Blockquotes are very handy to emulate reply or output text.
  > This line is part of the same quote.

  Quote break.

  > Oh, you can *put* **Markdown** into a blockquote.

------------------------------------------------------------------------------

Boxed Text (Verto feature)
==============================================================================

`Click here to read the documentation on how to box text`_.

------------------------------------------------------------------------------

Code
==============================================================================

You are able to include code snippets, either in a line of text or as a new block.

To include inline code, add a backtick to either side of the code.
For example: \`print("Hi")\` will display as ``print("Hi")``.
You cannot set the language syntax highlighting for inline code.

To create a code block, use a line of three backticks before and after the code.
You also can add syntax highlighting by specifying the language after the first set of backticks (`list of language codes`_).

.. code-block:: none

  ```python3
  def find_high_score(scores):
      if len(scores) == 0:
          print("No high score, table is empty")
          return -1
      else:
          highest_so_far = scores[0]
          for score in scores[1:]:
              if score > highest_so_far:
                  highest_so_far = score
          return highest_so_far
  ```

.. code-block:: python3

  def find_high_score(scores):
      if len(scores) == 0:
          print("No high score, table is empty")
          return -1
      else:
          highest_so_far = scores[0]
          for score in scores[1:]:
              if score > highest_so_far:
                  highest_so_far = score
          return highest_so_far

------------------------------------------------------------------------------

Comment (Verto feature)
==============================================================================

`Click here to read the documentation on how to add a comment`_.

------------------------------------------------------------------------------

Conditional (Verto feature)
==============================================================================

`Click here to read the documentation on how to define a conditional`_.

------------------------------------------------------------------------------

Embed iframe (Verto feature)
==============================================================================

`Click here to read the documentation on how to embed with an iframe`_.

------------------------------------------------------------------------------

Emphasis
==============================================================================

.. code-block:: none

  Emphasis, aka italics, with *asterisks*.

  Strong emphasis, aka bold, with **asterisks**.

Emphasis, aka italics, with *asterisks*.

Strong emphasis, aka bold, with **asterisks**.

.. note::

  We do not use underscores for emphasis to maintain consistency and readability.

------------------------------------------------------------------------------

Glossary Link (Verto feature)
==============================================================================

`Click here to read the documentation on how to define a glossary link`_.

------------------------------------------------------------------------------

Heading (Verto feature)
==============================================================================

`Click here to read the documentation on how to create a heading`_.

------------------------------------------------------------------------------

Image (Verto feature)
==============================================================================

`Click here to read the documentation on how to include an image`_.

------------------------------------------------------------------------------

.. _writing-guide-interactive:

Interactive (Verto feature)
==============================================================================

`Click here to read the documentation on how to include an interactive`_.

------------------------------------------------------------------------------

Line Breaks
==============================================================================

Here are some things to try out:

.. code-block:: none

  Here's a line for us to start with.

  This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

  This line is also a separate paragraph, but...
  This line is only separated by a single newline, so it's a separate line in the *same paragraph*.

------------------------------------------------------------------------------

Links
==============================================================================

There are several links that may be used:

The general syntax for links is ``[link text](link url)`` where ``link text`` is the text to be displayed in the document, and ``link url`` is the destination of the link.

**Escaping closing brackets within link URLs:** A closing bracket can be escaped by prefixing it with a backslash ``\)``.

Internal links
------------------------------------------------------------------------------

These are links to pages within the CS Field Guide website.
These links will not work when viewed in a Markdown renderer, however these will function properly when converted to HTML and viewed on the website.
Links to pages are referenced from the language directory within the ``content/`` directory (see examples below).

Link to Page Within Website (relative link - Verto feature)
------------------------------------------------------------------------------

You can refer to a page by writing the page name with ``.html`` at the end.
The name of a file is defined by it's slug in the configuration files, but it helps to have knowledge of the resulting URL path for a file.
See the examples below:

.. code-block:: none

  Check out [binary numbers](topics/binary-numbers.html).
  Check out the [about page](about.html).

`Click here to read the documentation on how to create a relative link`_.

Link to Heading on Page Within Website
------------------------------------------------------------------------------

You can refer to a subsection on a page by following the same syntax as above and then adding the subsection name at the end with a ``#`` separator.
All headers are subsections that have a link that can be linked to (called an anchor link).
The anchor link can be determined by converting the header name to lowercase, with spaces replaced with dashes, and punctuation removed.
In cases where duplicate headings exist on the same page, a number is appended on the end of the anchor link.

.. code-block:: none

  Please [contact us](about/index.html#contact).

Link to a Page Outside of Website (external link)
------------------------------------------------------------------------------

These are links to websites that are not a part of the CS Field Guide project.
The URL should include the ``https://`` or ``http://`` as required.

.. code-block:: none

  Check out [Google's website](https://www.google.com).

Create a Link on an Image (Verto feature)
------------------------------------------------------------------------------

Images should now be linked using the ``caption-link`` and ``source`` tag parameters for including an image.

Create a Link on a Button (Verto feature)
------------------------------------------------------------------------------

`Click here to read the documentation on how to add a button link`_.

------------------------------------------------------------------------------

Lists
==============================================================================

Lists can be created by starting each line with a ``-`` for unordered lists or ``1.`` for ordered lists.
The list needs to be followed by a blank line, however it doesn't require a blank line before unless the preceding text is a heading (a blank line is then required).
If you are having issues with a list not rendering correctly, try adding a blank line before the list if there is none, otherwise `submit a bug report`_ if you are still having rendering issues.

.. code-block:: none

  Unordered list:
  - Item 1
  - Item 2
  - Item 3

  Ordered list:
  1. Item 1
  2. Item 2
  3. Item 3

Unordered list:

- Item 1
- Item 2
- Item 3

Ordered list:

1. Item 1
2. Item 2
3. Item 3

Nested lists can be created by indenting each level by 2 spaces.

.. code-block:: none

  1. Item 1
    1. A corollary to the above item, indented by 2 spaces.
    2. Yet another point to consider.
  2. Item 2
    * A corollary that does not need to be ordered.
      * This is indented four spaces, because it's two for each level.
      * You might want to consider making a new list by now.
  3. Item 3

1. Item 1

  1. A corollary to the above item, indented by 2 spaces.
  2. Yet another point to consider.

2. Item 2

  * A corollary that does not need to be ordered.

    * This is indented four spaces, because it's two for each level.
    * You might want to consider making a new list by now.

3. Item 3

------------------------------------------------------------------------------

Math
==============================================================================

To include math (either inline or as a block) use the following syntax while using LaTeX syntax.

.. code-block:: none

  This is inline math: ``\( 2 + 2 = 4 \)``

  This is block math:

  ``\[ \begin{bmatrix} s & 0 \\ 0 & s \\ \end{bmatrix} \]``

Math equations are rendered in MathJax using the LaTeX syntax.

------------------------------------------------------------------------------

Panel (Verto feature)
==============================================================================

`Click here to read the documentation on how to create a panel`_.

------------------------------------------------------------------------------

Scratch (Verto feature)
==============================================================================

`Click here to read the documentation on how to include an image of Scratch block`_.

------------------------------------------------------------------------------

Table of Contents (Verto feature)
==============================================================================

`Click here to read the documentation on how to include a table of contents`_.

------------------------------------------------------------------------------

Tables
==============================================================================

Tables can be created using the following syntax:

.. code-block:: none

  Colons can be used to align columns.

  | Tables        | Are           | Cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | centered      |   $12 |
  | zebra stripes | are neat      |    $1 |

.. raw:: html
  :file: ../_static/html_snippets/markdown_example_table.html

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily, but there must be at least 3 dashes separating each header cell.
You can also use inline Markdown.

.. code-block:: none

  Markdown | Less | Pretty
  --- | --- | ---
  *Still* | `renders` | **nicely**
  1 | 2 | 3

.. raw:: html
  :file: ../_static/html_snippets/markdown_example_table_2.html

------------------------------------------------------------------------------

Video (Verto feature)
==============================================================================

`Click here to read the documentation on how to include a video`_.

------------------------------------------------------------------------------

Writing structure
==============================================================================

Chapters always contain an introduction page and several chapter sections that each cover a key sub topic of the main chapter topic.
Chapters always end in the same two sections; 'The whole story!' and 'Further reading'.
'The whole story!' is a summary of the chapter and 'Further reading' contains links and/or book references where students can read further about the topic.

------------------------------------------------------------------------------

.. _Verto: http://verto.readthedocs.io/en/latest/
.. _submit a bug report: https://github.com/uccser/cs-field-guide/issues/new
.. _Click here to read the documentation on how to box text: http://verto.readthedocs.io/en/latest/processors/boxed-text.html
.. _list of language codes: https://haisum.github.io/2014/11/07/jekyll-pygments-supported-highlighters/
.. _Click here to read the documentation on how to add a comment: http://verto.readthedocs.io/en/latest/processors/comment.html
.. _Click here to read the documentation on how to define a conditional: http://verto.readthedocs.io/en/latest/processors/conditional.html
.. _Click here to read the documentation on how to embed with an iframe: http://verto.readthedocs.io/en/latest/processors/iframe.html
.. _Click here to read the documentation on how to define a glossary link: http://verto.readthedocs.io/en/latest/processors/glossary-link.html
.. _Click here to read the documentation on how to create a heading: http://verto.readthedocs.io/en/latest/processors/heading.html
.. _Click here to read the documentation on how to include an image: http://verto.readthedocs.io/en/latest/processors/image.html
.. _Click here to read the documentation on how to include an interactive: http://verto.readthedocs.io/en/latest/processors/interactive.html
.. _Click here to read the documentation on how to create a relative link: http://verto.readthedocs.io/en/latest/processors/relative-link.html
.. _Click here to read the documentation on how to add a button link: http://verto.readthedocs.io/en/latest/processors/button-link.html
.. _Click here to read the documentation on how to create a panel: http://verto.readthedocs.io/en/latest/processors/panel.html
.. _Click here to read the documentation on how to include an image of Scratch block: http://verto.readthedocs.io/en/latest/processors/scratch.html
.. _Click here to read the documentation on how to include a table of contents: http://verto.readthedocs.io/en/latest/processors/table-of-contents.html
.. _Click here to read the documentation on how to include a video: http://verto.readthedocs.io/en/latest/processors/video.html
