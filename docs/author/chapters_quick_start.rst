Quick Start - Adding a Chapter
##############################

Prerequisites
=============

1. The development server is running (see :ref:`installation-check-project-setup-works`).
2. `(optional)` A basic understanding of Markdown.

A small note on structure
=========================

CSFG content is described using a combination of YAML (see `here`__ for a quick run down),
for the structure, and an extension of Markdown that we have designed called Verto
(see `here`__), used for the actual content that is displayed to the user.

Most content in CSFG, including Chapters and Curriculum Guides, use a very similar folder structure.
This means that once you've learnt how to create a Chapter, it should be relatively simple to look at
adding other content that uses the same structure.

Creating a new chapter
======================

Chapter structure
-----------------

Navigate to ``./csfieldguide/chapters/content``.
This is where the content for all of the chapters are stored.
We can see a few subdirectories.
Most of thes are for languages, these contain localised Verto files of the different chapters, broken up by section.
The last folder is the ``structure`` folder.
This is used to describe how the chapters and sections are laid out and ordered.

Here is a diagram of the directory structure at the end of this quick start:

.. raw:: html
  :file: ../_static/html_snippets/chapters_directory_structure.html

We will start by creating a chapter called "New Chapter".

Configuration
-------------

1. Under the ``structure`` subdirectory, create a new folder with the name ``new-chapter``. This name is referred to as the chapter's `slug`_.
   It must be lowercase with hyphens separating words.
2. Inside this folder we can create a chapter configuration file called ``new-chapter.yaml``.
   This contains some basic information about the chapter. For now, just paste this information into it:

    .. code-block:: yaml

        icon: svg/csfg-icon.svg
        sections: sections/sections.yaml


    See the :ref:`chapter-configuration-file` documentation for more info.

3. Staying inside the ``new-chapter folder``, create another folder called ``sections`` and add a file inside that is called ``sections.yaml`` with this content:

    .. code-block:: yaml

        first-section:
            section-number: 1

        another-section:
            section-number: 2

    This is called the :ref:`chapter-sections-configuration-file`, and it describes what order the different sections based off of their slugs.

4. Finally, we need to add the chapter to the list of chapters in ``content/structure/structure.yaml``. This is the :ref:`application-structure-file`.
   Just below the last chapter definition, add this code with the value in chapter-number replaced with the last chapter-number in the file plus 1. As of writing this, the last chapter number is 18, so I put 19 (Make sure the indentation is the same as the previous lines, YAML is very specific about indentation):

    .. code-block:: yaml

        new-chapter:
            chapter-number: 19

Writing the Markdown content
----------------------------

Okay, now that we're done with the boring configuration, lets get on to writing some content!
You can find a reference of all available Markdown and Verto formatting :doc:`in our writing guide <writing_guide>`, but a lot of the useful tags also have examples below.

1. First we need a directory for the content to go in. Under ``content/en`` create a folder called ``new-chapter``.
2. Let's start with the introduction page. Under this new folder, create a new file called ``new-chapter.md`` and add this text to it:

    .. code-block:: markdown

        # New Chapter (this text becomes the title of the chapter)

        This is the opening page of the chapter.
        The Heading 1 (#) becomes the title at the top of this page, and there should be an
        "Introduction" header just underneath it, when it is rendered.
        Multiple sets of whitespace (spaces, tabs, or new lines) are typically shrunken
        down to a single space, making it easy to nicely format the code without changing
        the formatting of the rendered page.

        To put a new line in the rendered page, put two new lines in the page.
        So, this should all be a seperate paragraph from the above text.
        You can do **bold**, *italic*, [links](https://csfieldguide.org.nz) and much more.

        ### Heading 3
        You can have up to 6 headings by using different numbers of #'s.
        {comment This is a comment, and it won't be visible in the rendered page}

3. For the sections, create a new subdirectory of ``new-chapter`` and call it ``sections``. For every slug that you defined in step 3 of Configuration, you want to create a file called `<slug>.md` (replace <slug> with the name of the slug). Here’s some example verto for the two sections, but feel free to come up with your own as well 🙂:
    
    ``first-section.md``:

    .. code-block:: markdown

        # This becomes the title of this section

        Just like for the chapter, the Heading 1 at the top of the file becomes the title
        on the rendered page.

        ## Some cool things you can do

        {blockquote}

        Blockquotes are cool!
        Also for any jargon such as the word {glossary-link term="lossless"}lossless{glossary-link end},
        you can link to the glossary (assuming there is a defintion for the term.

        {blockquote end}

        {image file-path="img/chapters/jflap-create-state.png" alt="Building an FSA &ndash; example" caption="true"}

        This is the caption text.

        {image end}

        ### Video

        {video url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"}

    ``another-section.md``:

    .. code-block:: markdown

        # The other section

        ## Panels!!!!

        {panel type="curiosity"}

        # Panels need a title

        How curious

        {panel end}https://cs-field-guide.readthedocs.io/en/latest/author/writing_guide.html

        {panel type="challenge"}

        # There are many different types of panels

        {blockquote}

        You can have other verto features inside panels too!!

        {blockquote end}

        {panel end}

        Below is a teacher panel, if you don't see it, change to teacher mode:

        {panel type="teacher"}
        
        # Hidden for everyone but teachers :)

        This is hidden unless you are in teacher mode 

        {panel end}

        ## And lastly... interactives
        This is an in-page interactive:

        {interactive slug="binary-cards" type="in-page"}

        And this is a link to a whole page interactive:

        {interactive slug="binary-cards" type="whole-page" parameters="digits=5&start=BBBBB" text="true"}

        Binary Cards Interactive

        {interactive end}

Updating the database
=====================

Lastly, we need to update the database.
Run ``./dev update_data``, and you should be able to see your new chapter when you refresh the page!

__ https://cs-field-guide.readthedocs.io/en/latest/author/understanding_configuration_files.html
__ https://cs-field-guide.readthedocs.io/en/latest/author/writing_guide.html

.. _slug: https://en.wikipedia.org/wiki/Clean_URL#Slug
