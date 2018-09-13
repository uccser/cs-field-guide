Interactives
##############################################################################

An *interactive* is an interactive component on a page.
This could be an educational game or demonstration that is created in HTML, CSS, and JavaScript.

This documentation page provides information about the interactive content of the Computer Science Field Guide.
Interactives are a great resource for teaching and practicing concepts in the CSFG.
The guidelines below aim to keep consistency among interactives.
It also allows developers to make modifications to existing interactive with ease.

.. contents:: Contents
  :local:

Interactive Modes
==============================================================================

Interactives can be included on a page in three different modes, these are:

- ``in-page`` - This is an interactive that is embedded within a page, for example, a chapter section.
- ``iframe`` - This is an interactive that is embedded in a chapter by using an iframe.
  This is used if the interactive is included multiple times in the chapter (to avoid conflicts in JS/CSS).
- ``whole-page`` - This in an interactive that is displayed on a new page, which is accessible via a button from the chapter.

An interactive could be displayed with any of the three modes, but generally an interactive is developed with ``in-page`` or ``whole-page`` as the target usage.

Adding Interactives
==============================================================================

Once you have developed your interactive (see :ref:`developing-interactives`), it's time to add it to a page.
This includes embedding the interactive in the chapter text see :ref:`writing-guide-interactive`.

.. note::

  When adding an interactive using the Verto syntax, note that Verto uses the term ``name``, this is actually referring to the ``slug`` of the interactive.

The interactive will also need to be added to the list of interactives in the interactive configuration file (see below).

.. _interactive-configuration-files:

Interactive Configuration Files
------------------------------------------------------------------------------

- **File Name:** ``interactives.yaml``

- **Location:** ``interactives/content/structure/``

- **Purpose:** Defines the list of interactives in the Field Guide.

- **Required Fields:**

  - ``interactives:`` A dictionary of all interactive data, where each key is a slug for an interacive.

A complete interactive structure file may look like the following:

.. code-block:: yaml

    sorting-algorithm-comparison:
      languages:
        en: interactives/sorting-algorithm-comparison.html
        de: interactives/sorting-algorithm-comparison.html
    high-score-boxes:
      languages:
        en: interactives/high-score-boxes.html
        de: interactives/high-score-boxes-de.html
    caesar-cipher:
      languages:
        en: interactives/caesar-cipher.html

Every interactive must also have a YAML file within each locale containing the names of the interactives, in the language for that particular locale.

The translation YAML file:

- **Is in:** ``topics/content/<locale>/``
- **Is called:** ``interactives.yaml``
- **Contains:** Provides names of all interactives.
  Every interactive slug present in the interactive structure file must be present in each locale's translation file.

  For example,

  .. code-block:: yaml

    sorting-algorithm-comparison:
      name: Sorting Algorithm Comparison
    high-score-boxes:
      name: High Score Boxes
    caesar-cipher:
      name: Caesar Cipher

.. _developing-interactives:

Developing Interactives
==============================================================================

Directory Structure
------------------------------------------------------------------------------

.. warning::

  You should have an understanding of the following concepts before proceeding (*we won't teach you how to do these here, there are plenty of great guides online!*):

  - HTML
  - CSS
  - JavaScript
  - How to use a responsive grid based CSS framework

Every interactive will follow a very similar file structure as given below:

.. code-block:: none

  └── csfieldguide/
      ├── static/
      │   ├── interactives/
      │   │   └── <interactive-slug>/
      │   │       ├── css/
      │   │       │   ├── third-party/
      │   │       │   └── style.css
      │   │       ├── img/
      │   │       ├── js/
      │   │       │   ├── third-party/
      │   │       │   └── script.js
      │   │       ├── README.md
      │   │       └── thumbnail.png
      │   ├── js/
      │   │   └── third-party/
      │   └── css/
      │       └── third-party/
      └── templates/
          └── interactives/
              └── <interactive-template>.html

.. note::

  Each interactive has a unique ``slug``, which is used in file/directory names and urls. For example the slug for the ``High Score Boxes`` interactive is ``high-score-boxes``.

Items of interest from this diagram:

- ``static/interactives/<interactive-slug>/`` - This is the directory where static files for the interactive are stored, which should be broken down into ``css``, ``js`` and ``img`` directories.

- ``static/interactives/<interactive-slug>/js/third-party/`` - Any third party JavaScript libraries specific to this interactive must be stored in this directory (unless you are using a CDN)

- ``third-party/`` - Any third party css or js libraries used in multiple interactives can be stored in ``static/css/third-party/`` and ``static/js/third-party/`` directories.

.. warning::

  Any third-party libraries you include must have a licence that allows them to be used in the CSFG.
  A summary of the library's licence must be added to ``LICENCE-THIRD-PARTY`` with the full licence file added to ``cs-field-guide/third-party-licences/``.

- ``static/interactives/<interactive-slug>/README.md`` - This is a short file that that explains the interactive's purpose and links to any necessary wiki pages.

- ``static/interactives/<interactive-slug>/thumbnail.png`` - ``whole-page`` interactives required a thumbnail image showing the interactive in action.
  Unless specified when included in the chapter ``md`` file, the file needs to be named as ``thumbnail.png``.
  The image should be at least 900px wide, and of moderate quality (small size is more important than quality).

- ``templates/interactives/<interactive-interactive>.html`` - This is the HTML template for the interactive for a specific locale, as defined in the interactive configuration file.
  Locale may or may not share a template for an interactive, allowing different versions of an interactive to be available (`see GitHub for more information <https://github.com/uccser/cs-field-guide/pull/710>`_).
  A template can also be omitted for a locale to disable the interactive for the locale.

  The HTML file should have the following contents:

  .. code-block:: html

    {% extends interactive_mode_template %}

    {% block html %}
      <!-- The HTML of your interactive goes here -->
    {% endblock html %}

    {% block css %}
      <!-- The CSS of your interactive goes here -->
    {% endblock css %}

    {% block js %}
      <!-- The JavaScript of your interactive goes here -->
    {% endblock js %}

  The first line ``{% extends interactive_mode_template %}`` is required for all interactives.

We recommend looking at existing interactives and how their files are organised to become familiar with developing your own interactive.

Interactive Requirements
------------------------------------------------------------------------------

A completed interactive requires the following to be included into the repository for release:

- A ``README.md`` file explaining the interactive, linking to any necessary wiki pages.
- Extra libraries/scripts that have been used have been used and attributed correctly, see :ref:`licence-files`.
- Be easily accessible on desktop and mobile, or show a disclaimer that it is suited for desktop use only.
- Abides by the repository contribution style guidelines.
- Must work in browsers updated within the last year.
  Therefore try and avoid experimental features but don't worry about supporting older browsers (but it's great if it can!).
