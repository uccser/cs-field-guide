Chapter Content
##############################################################################

The chapters application (see :ref:`what-is-an-application`) is the main focus of
the CS Field Guide website, as it contains the majority of educational material
for the project.

.. contents:: Contents
  :local:


Chapters Overview
==============================================================================


Application Structure Configuration File
==============================================================================


The application is made up of **chapters** and each **chapter** is broken down into **sections** which are specified in the ``structure.yaml`` file, which is in YAML format.

- **File Name:** ``structure.yaml``

- **Location:** ``chapters/content/en/``

- **Purpose:** Defines the structure and location of all the different chapters.

- **Required Fields:**

  - ``chapters:`` A dictionary of chapters, where eacy key is a chapter.

    - **Required Fields:**

      - ``<chapter-key>:`` The key for a chapter.

        - **Required Fields:**

      	  - ``chapter-number:`` The number order for this chapter.

          - ``title:`` The title of the chapter.

          - ``icon:`` The file path to the icon for the chapter.

          - ``sections:`` A dictionary of sections, where each key is the key to a section.

      	    - **Required Fields:**

      	      - ``<section-key>:`` The key for a section.

      	        - **Required Fields:**

            	  - ``section-number:`` The number order for this section.

- **Optional Fields:**

  - ``glossary-folder``: The name of the glossary folder.

A complete chapter application structure file with multiple chapters may look like the following:

  .. code-block:: yaml
    
    chapters:
      introduction:
        chapter-number: 1
        title: Introduction
        icon: img/chapters/introduction-icon.png
        sections:
          introduction-for-teachers:
            section-number: 1
          further-reading:
            section-number: 2
      algorithms:
        chapter-number: 1
        title: Algorithms
        icon: img/chapters/algorithms-icon.png
        sections:
          the-big-picture:
            section-number: 1
          sorting-algorithms:
            section-number: 2
      glossary-folder: glossary