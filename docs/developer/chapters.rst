Chapters Application
##############################################################################

The chapters application is the main focus of the CS Field Guide website, as it contains the majority of educational material for the project.

.. note::

  This guide assumes you've read the following documentation:

  - :doc:`../author/chapters` - Provides detail on content in chapters application
  - :doc:`django_setup` - Provides detail of database structure

In general the chapters application is a standard Django application, however it does store and update its associated data for its models uniquely.

Instead of creating and updating model objects through the website (for example: edited by an online editor), the objects are updated by a management script.
The content for the chapters application is stored within the ``contents/`` directory, as is run for each deployment of the system.
Storing the content within the Git repository gives us greater control over reviewing and accepting proposed changes to content.

The management command for updating the applications data is ``loadchapters`` (which is automatically called when running ``updatedata``), and can be found at ``management/commands/loadchapters.py``.
