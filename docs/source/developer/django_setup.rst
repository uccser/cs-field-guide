Django Setup
##############################################################################

This page covers the configuration of Django for this project.

Django Overview
==============================================================================

We aim to create a clear Django system for ease of development.
We are using some advised patterns and practices from `Two Scoops of Django - Best Practices for Django 1.8`_, which include (but is not limited to the following):

- Locking versions of dependencies.
- Django secret settings are loaded from environment variables.
- All templates are located in the ``templates/`` directory.
- The base Django directory, containing ``settings.py`` and base ``urls.py`` is called ``config/``.

The Django system currently contains the following applications:

- ``general/`` - For general website pages (for example: homepage).
- ``chapters/`` - For chapter content
- ``interactives/`` - For interactive content

Database Structure
==============================================================================

The following image shows the relationships between models across all applications within the database.

.. The following image can copied for be edits here: https://docs.google.com/drawings/d/1jXwstn-QNVd_WOy15_6TW4IR-p7W4khwQVNvdBnCu7w/edit?usp=sharing
.. image:: ../_static/img/database_overview_diagram.png
  :alt: A diagram detailing the general structure of the database

The rest of the :doc:`index` will inform you of how to develop the applications and other components of the CS Field Guide project.

Loaders
==============================================================================

To populate the database with content we have written a series of custom loaders.
The loaders for an application are found in the ``management/commands/`` directory, and there is approximately one loader for each configuration file.

Besides populating fields in the database, a loader is also responsible for checking that its corresponding configuration file contains all the required fields, Markdown files are not empty, and icons can be found.
If any of these conditions are not met, then an error is thrown.

Errors are defined in ``utils/errors/`` and should aim to be as descriptive and useful as possible as they will most often be read by an author and not necessarily a Python developer.

.. _Two Scoops of Django - Best Practices for Django 1.8: https://www.twoscoopspress.com/products/two-scoops-of-django-1-8
