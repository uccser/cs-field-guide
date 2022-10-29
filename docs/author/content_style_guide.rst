Content Style Guide
##############################################################################

.. contents:: Contents
  :local:

These notes are specific to the Computer Science Field Guide project.
Be sure to read our `general content style guide <https://uccser.github.io/technical-documentation/content-style/>`_.

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
