Chapter Content
##############################################################################

The chapters application (see :ref:`what-is-an-application`) is the main focus of
the CS Field Guide website, as it contains the majority of educational material
for the project.

.. contents:: Contents
  :local:


Chapters Overview
==============================================================================

The application is made up of **chapters** and each **chapter** is broken down into **sections** which are specified in the ``structure.yaml`` file, which is in YAML format.


Application Structure Configuration File
==============================================================================

- **File Name:** ``structure.yaml``

- **Location:** ``chapters/content/en/``

- **Purpose:** Defines the structure and location of all the different chapters.

- **Required Fields:**

  - ``chapters:`` A dictionary of chapters, where each key is a chapter.

    - **Required Fields:**

      - ``<chapter-key>:`` The key for a chapter.

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


Chapter Configuration File
==============================================================================

- **File Name:** ``<chapter-key>.yaml``

- **Location:** ``chapters/content/en/<chapter-key>/``

- **Referenced in:** ``chapters/content/en/structure.yaml``

- **Purpose:** Defines the attributes for a particular chapter.

- **Required Fields:**

  - ``icon:`` File path to the icon for the chapter.

  - ``sections:`` File path to the configuration files for sections in the chapter.

- **Optional Fields:**

  - ``other-resources``: File path to a file with additional resources for the chapter.

A complete chapter structure file may look like the following:

  .. code-block:: yaml

    icon: img/chapters/introduction-thumbnail.png
    sections: sections/sections.yaml
    other-resources: other-resources.md


Chapter Sections Configuration File
==============================================================================

- **File Name:** ``sections.yaml``

- **Location:** ``chapters/content/en/<chapter-key>/sections/``

- **Referenced in:** ``chapters/content/en/<chapter-key>/<chapter-key>.yaml``

- **Purpose:** Specifiy sections for a chapter and their relative order.

- **Required Fields:**

  - ``<section-key>:`` Key for the section.

    - **Required Fields:**

      - ``section-number:`` Number order for the section in the chapter.

A complete chapter application structure file with multiple chapters may look like the following:

  .. code-block:: yaml

    introduction-for-teachers:
      section-number: 1

    further-reading:
      section-number: 2
