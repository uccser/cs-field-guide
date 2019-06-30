Interactives
##############################################################################

An *interactive* is an interactive component on a page.
This could be an educational game or demonstration that is created in HTML, CSS, and JavaScript.

This documentation page provides information about the interactive content of the Computer Science Field Guide.
Interactives are a great resource for teaching and practicing concepts in the CSFG.
The guidelines below aim to keep consistency among interactives.
It also allows developers to make modifications to existing interactives with ease.

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

.. _developing-interactives:

Developing Interactives
==============================================================================

Directory Structure
------------------------------------------------------------------------------

.. warning::

  You should have an understanding of the following concepts before proceeding (*we won't teach you how to do these here, there are plenty of great guides online!*):

  - HTML
  - CSS/SCSS
  - JavaScript
  - `Bootstrap`_

Every interactive will follow a very similar file structure as given below:

.. code-block:: none

  └── csfieldguide/
      ├── static/
      │   ├── interactives/
      │   │   └── <interactive-slug>/
      │   │       ├── scss/
      │   │       │   ├── third-party/
      │   │       │   └── <interactive-slug>.scss
      │   │       ├── img/
      │   │       ├── js/
      │   │       │   ├── third-party/
      │   │       │   └── <interactive-slug>.js
      │   │       ├── package.json
      │   │       └── README.md
      │   ├── js/
      │   │   └── third-party/
      │   └── scss/
      │       └── third-party/
      └── templates/
          └── interactives/
              └── <interactive-slug>.html

.. note::

  Each interactive has a unique ``slug``, which is used in file/directory names and urls. For example the slug for the ``High Score Boxes`` interactive is ``high-score-boxes``.

Items of interest from this diagram:

- ``static/interactives/<interactive-slug>/`` -- This is the directory where static files for the interactive are stored, which should be broken down into ``scss``, ``js`` and ``img`` directories.

- ``static/interactives/<interactive-slug>/package.json`` -- The ``package.json`` file is npm's configuration file for projects and modules.
  Here we include any dependencies the interactive has.
  This file should only be included if the interactive loads **at least 1** npm module.
  An example structure of a package.json file for an interactive is below:

  .. code-block:: none

    {
      "name": "csfg-interactive-<interactive-slug>",
      "version": "1.0.0",
      "private": true,
      "dependencies": {
          "<module-name>": "<module-version>"
      }
    }
  
  You will need to make sure the path to this file is listed in the ``csfieldguide/package.json`` file.
  More information on npm modules can be found on the :ref:`static files` page.

- ``static/interactives/<interactive-slug>/js/third-party/`` -- Third-party JavaScript libraries specific to this interactive should be loaded as modules through the ``package.json`` file (see above).
  Add the source JS file to this directory only if it is not possible to load the module through package.json.

- ``third-party/`` -- Any third party css or js libraries used in multiple interactives can be stored in ``static/css/third-party/`` and ``static/js/third-party/`` directories.

.. warning::

  Any third-party libraries you include must have a licence that allows them to be used in the CSFG.
  A summary of the library's licence must be added to ``LICENCE-THIRD-PARTY`` with the full licence file added to ``cs-field-guide/third-party-licences/``.

- ``static/interactives/<interactive-slug>/README.md`` -- This is a short file that that explains the interactive's purpose.
  It can also include links to any documentation or websites that future developers may find useful.

- ``templates/interactives/<interactive-slug>.html`` -- This is the HTML template for the interactive for a specific locale, as defined in the interactive configuration file.
  Locale may or may not share a template for an interactive, allowing different versions of an interactive to be available (`see GitHub for more information <https://github.com/uccser/cs-field-guide/pull/710>`_).
  A template can also be omitted for a locale to disable the interactive for the locale.

  The HTML file should have the following contents:

  .. code-block:: html

    {% extends interactive_mode_template %}
  
    {% load i18n %}
    {% load static %}

    {% block html %}
      <!-- The HTML of your interactive goes here -->
    {% endblock html %}

    {% block css %}
      <!-- The CSS of your interactive goes here. Example of how to link to css file below. -->
      <link rel="stylesheet" href="{% static 'interactives/<interactive-slug>/css/<interactive-slug>.css' %}">
    {% endblock css %}

    {% block js %}
      <!-- The JavaScript of your interactive goes here. Example of how to link to js file below. -->
      <script type="text/javascript" src="{% static 'interactives/<interactive-slug>/js/<interactive-slug>.js' %}"></script>
    {% endblock js %}

  The first line ``{% extends interactive_mode_template %}`` is required for all interactives.
  The second line ``{% load i18n %}`` is needed if there is translatable text in the template.
  The third line ``{% load static %}`` allows us to serve additional files such as images, JavaScript or CSS.
  These are referred to as "static files" in Django.

We recommend looking at existing interactives and how their files are organised to become familiar with developing your own interactive.

Interactive Requirements
------------------------------------------------------------------------------

A completed interactive requires the following to be included into the repository for release:

- A ``README.md`` file explaining the interactive, linking to any documentation or websites that future developers may find useful.
  Uninteractives generally don't have a ``README.md`` file unless future developers may find it useful.
- Extra libraries/scripts that have been used have been used and attributed correctly, see :ref:`licence-files`.
- Be easily accessible on desktop and mobile, or show a disclaimer that it is suited for desktop use only.
- Abides by the repository contribution style guidelines.
- Must work in browsers updated within the last year.
  Therefore try and avoid experimental features but don't worry about supporting older browsers (but it's great if it can!).

.. _adding-interactives:

Adding Interactives
==============================================================================

Once you have developed your interactive (see :ref:`developing-interactives`), it's time to add it to a page.
This includes embedding the interactive in the chapter text (see :ref:`writing-guide-interactive`).

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

  - The dictionary of interactive data must include:

    - ``languages:`` A dictionary of all languages the interactive is available in, where each key is the locale.

    - ``is_interactive:`` This field was introduced so we could distingush between interactives and `uninteractives`_.
      If the ``is_interactive`` field is set to ``false``, it is not displayed in the interactives appendix.
      It means the user cannot interact with it to the extent where it would be useful to have as a standalone feature.

A complete interactive structure file may look like the following:

.. code-block:: yaml

    colour-matcher:
      languages:
        en: interactives/colour-matcher.html
      is_interactive: true
    compression-comparer:
      languages:
        en: interactives/compression-comparer.html
        de: interactives/compression-comparer.html
      is_interactive: true
    confused-buttons:
      languages:
        en: interactives/confused-buttons.html
        de: interactives/confused-buttons.html
        es: interactives/confused-buttons.html
      is_interactive: false

Every interactive must also have a YAML file within each locale containing the names of the interactives, in the language for that particular locale.

The translation YAML file:

- **Is in:** ``interactives/content/<locale>/``
- **Is called:** ``interactives.yaml``
- **Contains:** Provides names of all interactives.
  Every interactive slug present in the interactive structure file must be present in each locale's translation file.

  For example,

  .. code-block:: yaml

    colour-matcher:
      name: Colour Matcher
    compression-comparer:
      name: Compression Comparer
    confused-buttons:
      name: Confused Buttons

.. _uninteractives:

Uninteractives
------------------------------------------------------------------------------

Uninteractives follow the exact same structure as interactives, the biggest difference is that they are not designed to be interacted with.
They are most commonly used as a replacement for images with text we want translated.
Uninteractives are distinguished from interactives by setting the ``is_interactive:`` attribute to ``false`` in the ``interactives.yaml`` configuration file.
Uninteractives are not displayed in the interactives appendix.

.. _Bootstrap: https://getbootstrap.com/docs/4.1/getting-started/introduction/
