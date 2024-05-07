Chapters
##############################################################################

The chapters application is the main focus of the Computer Science Field Guide website, as it contains the majority of educational material for the project.

.. contents:: Contents
  :local:


Chapters Overview
==============================================================================

The application is made up of **chapters** and each **chapter** is broken down into **sections**.

.. _chapters-directory-structure:

Chapters Content Directory
==============================================================================

The ``content`` directory for the chapters application contains

- a directory for each language in which content exists, named using the Django locale code.
  This directory contains content Markdown files.

- a special ``structure`` directory which contains all configuration YAML files

.. _file-types:

Content Files
==============================================================================

There are 2 different types of files used for adding content to the Computer Science Field Guide:

- Content Markdown files
- YAML configuration files

All files live inside the ``chapters/content`` directory.
Content Markdown files are unique for each translation language, and are stored in a directory tree specific to that language.
This directory is named using the languages Django locale code (for example: ``en`` or ``de``).
Configuration files are shared amongst all languages, because the content structure is the same for all languages.
These files live under a special ``structure`` directory.

As a simple rule, structure files situated inside the ``structure`` directory contain **no** text a website user will see.
Any user-facing text lives in a Markdown file inside the locale specific directories.

Configuration Files
==============================================================================

This section details configuration files within the ``content/structure`` directory.
These files are in YAML format. If you are not familiar with YAML, see :doc:`understanding_configuration_files`.

The diagram below shows an example of YAML file locations for the ``content/structure/`` language directory, where:

- Blue is directories.
- Red is YAML configuration files.

.. raw:: html
  :file: ../_static/html_snippets/chapters_content_directory_tree_only_yaml.html

In the following sections, each configuration file is explained in more detail.

.. note::

  - Some of the slugs have angle brackets around them, ``<like so>``.
    This means that they are variables and you can call them whatever you like in your configuration file (without the angle brackets).
    Key names should be consistent, i.e every instance of <chapter-slug> should be replaced with the exact same slug.

.. _application-structure-file:

Application Structure Configuration File
------------------------------------------------------------------------------

- **File Name:** ``structure.yaml``

- **Location:** ``chapters/content/structure/``

- **Purpose:** Defines the structure and location of all the different chapters.

- **Required Fields:**

  - ``chapters:`` A dictionary of chapters, where each slug is a chapter.

    - **Required Fields:**

      - ``<chapter-slug>:`` The slug for a chapter.

        - **Required Fields:**

          - ``chapter-number:`` The number order for this chapter.

- **Optional Fields:**

  - ``glossary-folder``: The name of the glossary folder.

A complete chapter application structure file with multiple chapters may look like the following:

  .. code-block:: yaml

    chapters:
      introduction:
        chapter-number: 1
      algorithms:
        chapter-number: 2
    glossary-folder: glossary

.. _chapter-configuration-file:

Chapter Configuration File
------------------------------------------------------------------------------

- **File Name:** ``<chapter-slug>.yaml``

- **Location:** ``chapters/content/structure/<chapter-slug>/``

- **Referenced in:** ``chapters/content/structure/structure.yaml``

- **Purpose:** Defines the attributes for a particular chapter.

- **Required fields:**

  - ``icon:`` File path to the icon for the chapter.
    Icons must be SVG files.

  - ``sections:`` File path to the configuration files for sections in the chapter.

- **Optional fields:**

  - ``video:`` URL for the video that appears at the very beginning of the chapter introduction page.

A complete chapter structure file may look like the following:

  .. code-block:: yaml

    icon: svg/introduction-icon.svg
    sections: sections/sections.yaml

.. _chapter-sections-configuration-file:

Chapter Sections Configuration File
------------------------------------------------------------------------------

- **File Name:** ``sections.yaml``

- **Location:** ``chapters/content/structure/<chapter-slug>/sections/``

- **Referenced in:** ``chapters/content/structure/<chapter-slug>/<chapter-slug>.yaml``

- **Purpose:** Specifiy sections for a chapter and their relative order.

- **Required Fields:**

  - ``<section-slug>:`` Key for the section. Cannot contain macrons.

    - **Required Fields:**

      - ``section-number:`` Number order for the section in the chapter.
    
    - **Optional fields:**

    - ``slug:`` Override the chapter section's slug. Use this to include macrons in URL. (See mātāpono-māori chapter section for example use case.)

A complete chapter application structure file with multiple chapters may look like the following:

  .. code-block:: yaml

    introduction-for-teachers:
      section-number: 1

    further-reading:
      section-number: 2
