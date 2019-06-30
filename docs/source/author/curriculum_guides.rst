Curriculum Guides
##############################################################################

The curriculum guides application (see :ref:`what-is-an-application`) contains teacher guides for incorporating Field Guide material into lessons for particular curricula.
The infrastructure is near-identical to that of the :doc:`./chapters` application, so this page will mostly cover what is different.

.. contents:: Contents
  :local:

Curriculum Guides Overview
==============================================================================

Much like the chapters application, the curriculum guides application is made up of **curriculum guides** and each **curriculum guide** is broken down into **sections**.
The content and configuration files are stored in the same way as those in the :doc:`./chapters` application, with 'chapter' equating to 'curriculum guide'.

.. _what-is-different:

What is different?
==============================================================================

The most significant differences between the curriculum guides and chapters applications are as follows:

- Interactives cannot be added to curriculum guides.
- Glossary terms cannot be linked to in curriculum guides, as the glossary is a part of the chapters application.
- There is no required ``icon`` field in a curriculum guide configuration file.
- There is no optional ``video`` field in a curriculum guide configuration file.

.. _curriculum-guide-examples:

Examples
==============================================================================

A complete curriculum guide application structure file with multiple curriculum guides may look like the following:

  .. code-block:: yaml

    curriculum_guides:
      ncea:
        curriculum-guide-number: 1
      apcsp:
        curriculum-guide-number: 2

A complete curriculum guide structure file may look like the following:

  .. code-block:: yaml

    sections: sections/sections.yaml

A complete curriculum guide application structure file with multiple guides may look like the following:

  .. code-block:: yaml

    creativity:
      section-number: 1

    abstraction:
      section-number: 2
