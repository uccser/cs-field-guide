Project Structure
###########################################

This page covers the structure of the CS Field Guide project.
The following diagram will be helpful when reading the following sections:

.. raw:: html
  :file: ../_static/html_snippets/project_directory_tree.html

Repository Directory
=================================================

The repository directory (or root directory) contains the following:

- ``csfieldguide/``

  - This directory contains the Django web system for the CS Field Guide website.
    This includes all raw text content, images, resources, etc.

- ``docs/``

  - This directory contains the documentation for the repository (which includes
    the file you are reading now).

- ``subtitles/``

  - This directory contains subtitle files for CS Field Guide videos.

- ``README.md``

  - This file contains an introduction and important information for the
    repository.

- ``LICENCE.md``

  - This file details the licences the repository uses.

- Plus other files used for installation and repository configuration.

csfieldguide Directory
=================================================

The ``csfieldguide/`` directory holds the Django web system and is split across
the following directories:

- ``config/``

  - This directory holds the settings used by the Django system.
    It's unlikely you'll edit the contents of this directory unless you are
    changing the Django configuration (for example: adding a new application).

- ``tests/``

  - This directory holds all the tests for the project.

- ``utils/``

  - Utility functions used throughout the application. One example would be custom
    converter templates for Verto.

.. _django-applications:

Django contains 'applications' which are Python packages that provide
some set of features.
Each large part/chunk of the CS Unplugged is a separate application.
The project currently contains the following applications:

- ``general/``

  - This application displays webpages for generic pages on the website.
    For example: homepage, about page, contact page, etc.

- ``chapters/``

  - The core CS Field Guide content is split across chapters, with each topic
    containing any number of sections. THis applications stores and displays the
    chapters content.

- ``curriculum_guides/``

  - This application displays a collection of curriculum guides to help
    teachers use CS Field Guide to help teach their own curriculum.

- ``interactives/``

  - This application contains all of the interactive content used throughout
    CS Field Guide.

- ``search/``

  - This application contains all the logic and ui to manage searching the entire website.

See the Adding a Chapter quick start for an example of dealing with an application.

The following directories are also required by the Django system:

- ``static/``

  - This directory contains non-user-generated media assets (for example:
    images, JavaScript, CSS/SCSS, etc).

- ``staticfiles/``

  - This is where static files are served to the different applications
    inside the project.

- ``templates/``

  - This directory contains all the HTML templates for the Django system.

- ``locale/``

  - This directory contains translations required for the Django system.
    Translations for ``topics/`` are stored within the ``topics/content/``.

The following directories are used when the server is running (for example:
a script compiles the SCSS to CSS and saves it to the ``build/`` directory for
serving on a webpage).
You should never save anything in these directories, as the contents are often
overwritten and cleared.

- ``build/``

  - Contains the generated output of the front-end script (for example:
    compiled and minified CSS and JavaScript, compressed images, etc).

- ``temp/``

  - Contains temporary files used in creating generated files for
    ``build`` directory.

The ``csfieldguide/`` directory also contains the following files:

- ``manage.py``

  - A file created by Django used to manage the Django web system.
    Don't modify the contents of this file.
