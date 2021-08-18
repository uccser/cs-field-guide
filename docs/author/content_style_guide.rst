Content Style Guide
##############################################################################

.. contents:: Contents
  :local:

Most Importantly
==============================================================================

**Be consistent**.
If you are unsure of how to do something, see if there are similar examples in the Field Guide and follow the style used.
Please get in touch if you find inconsistencies or something doesn't make sense.

Writing Style
==============================================================================

Content
------------------------------------------------------------------------------

- When using pronouns in reference to a hypothetical person, gender neutral pronouns (they/their/them) should be used.
- All documents (other than those for internal use only) must be written clearly and simply so that a student is able to understand them.
- Any jargon used needs to be clearly explained and should be considered as a glossary definition.

Separators
------------------------------------------------------------------------------

- Use a hyphen to hyphenate words (e.g. ``double-barrelled words``).
- Use ``&ndash;`` to add supplemental information (e.g. ``do this &ndash; it does something!``).
- ``&ndash;`` does not work for titles, so if needed use a hyphen.

English Spelling
------------------------------------------------------------------------------

- Use New Zealand English; this is almost always British English.
- For specific examples check the `UCCSER spelling guide <https://github.com/uccser/uccser-extras/blob/master/english-spelling-guide.md>`__.

Capitalisation Rules
==============================================================================

- Capitalise every word in a major title, such as a chapter title.
- Capitalise only the first word per sentence in a lesser title, such as a chapter section title or heading (for this purpose a colon or hyphen counts as the end of a sentence).
- Capitalise acronyms/initialisms like *NASA* and *CSFG*.
- Capitalise proper nouns (such as peoples' names) appropriately.
- Do not capitalise general terms or jargon unless the above rules apply.

Extra notes for specific content
==============================================================================

Glossary
------------------------------------------------------------------------------

The following are added to the glossary and linked to where the words are used:

- All computer science, programming, and mathematical jargon.
- All education jargon.
- All curriculum language that is not broadly used internationally.

Each glossary term has it's own Markdown file under the ``csfieldguide/chapters/content/en/glossary/`` directory.
Here is an example of the Markdown file for the glossary term 'unicode':

.. code-block:: none

  # Unicode

  Unicode is an extension of ASCII; it supports characters from multiple languages, using 16 bits per character.

And here is an example of how to use Verto syntax to link to a glossary term in a chapter:

.. code-block:: none

  This is an example of the glossary term {glossary-link term="unicode"}unicode{glossary-link end} being used in a sentence.

This will create a clickable link that reveals the glossary term on the page.
