Helper Commands for Developing
##############################################################################

.. note::

  We assume by this point you have installed the project, checked the setup is working (see :ref:`installation-check-project-setup-works`), and also have a basic understanding of the :doc:`project structure <project_structure>`.

The CS Field GUide project uses many systems (Django, Docker, Gulp, etc) to run, so we have written a script for running groups of commands for running the system while developing.

The script is called ``dev`` and can be found in the ``cs-field-guide`` folder of the repository.
To run this script, open a terminal window in the directory and enter the following command (you don't need to enter the ``$`` character, this shows the start of your terminal prompt):

.. code-block:: bash

    $ ./dev [COMMAND]

Where ``[COMMAND]`` is a word from the list below:

- :ref:`build`
- :ref:`collect_static`
- :ref:`compilemessages`
- :ref:`end`
- :ref:`exec`
- :ref:`help`
- :ref:`logs`
- :ref:`make_interactive_thumbnails`
- :ref:`makemessages`
- :ref:`makemigrations`
- :ref:`migrate`
- :ref:`reboot_django`
- :ref:`rebuild_index`
- :ref:`restart`
- :ref:`start`
- :ref:`static`
- :ref:`style`
- :ref:`test_backwards`
- :ref:`test_coverage`
- :ref:`test_specific`
- :ref:`test_suite`
- :ref:`update`
- :ref:`update_data`
- :ref:`update_static`

All users of the project (content and technical developers) should become familiar with the following commands:

- :ref:`start`
- :ref:`end`
- :ref:`build`
- :ref:`update`

-----------------------------------------------------------------------------

.. _build:

``build``
==============================================================================

Running ``./dev build`` will build or rebuild the Docker images that are required for the CS Unplugged system.

-----------------------------------------------------------------------------

.. _collect_static:

``collect_static``
==============================================================================

Running ``./dev collect_static`` runs the Django ``collectstatic`` command to collect static files.
It will copy files under the ``static/`` folder into the ``staticfiles/`` folder.

-----------------------------------------------------------------------------

.. _compilemessages:

``compilemessages``
==============================================================================

Running ``./dev compilemessages`` runs the Django ``compilemessages`` command.
This runs over ``.po`` files and creates ``.mo`` files which are optimised for use by ``gettext``.
You will need to run this command after each time you create your message file or each time you make changes to it.

-----------------------------------------------------------------------------

.. _end:

``end``
==============================================================================

Running ``./dev end`` will stop any containers which are currently running, this usually takes 10 to 20 seconds.

-----------------------------------------------------------------------------

.. _exec:

``exec``
==============================================================================

Running ``./dev exec`` allows you to run a command inside a container.
This is commonly used to run a bash shell, allowing you to inspect
what is going on inside the container.

As an example, ``./dev exec django bash`` would be the equivalent to entering
``docker compose run django bash``

-----------------------------------------------------------------------------

.. _help:

``help``
==============================================================================

Running ``./dev help`` displays brief help text for the script.
More details for each command can be found on this page.

-----------------------------------------------------------------------------

.. _logs:

``logs``
==============================================================================

Running ``./dev logs`` will display the logs for the running systems.
The output is for all logs until the time the command was run, therefore successive calls may display new logs.

To follow logs as they output, enter ``docker compose logs --follow``.


-----------------------------------------------------------------------------

.. _make_interactive_thumbnails:

``make_interactive_thumbnails``
==============================================================================

Running ``./dev make_interactive_thumbnails`` generates the thumbnails for
the interactives.

-----------------------------------------------------------------------------

.. _makemessages:

``makemessages``
==============================================================================

Running ``./dev makemessages`` runs the Djanog ``makemessages`` command.
This will create message files where each message file represents a single language.
Message files contain all available translation strings and how they should be represented in the given language.

-----------------------------------------------------------------------------

.. _makemigrations:

``makemigrations``
==============================================================================

Running ``./dev makemigrations`` runs the Django ``makemigrations`` command to create migration files.

-----------------------------------------------------------------------------

.. _migrate:

``migrate``
==============================================================================

Running ``./dev migrate`` runs the Django ``migrate`` command to apply migration files.

-----------------------------------------------------------------------------

.. _reboot_django:

``reboot_django``
==============================================================================

Running ``./dev reboot_django`` will rebuild the Django Docker container.

-----------------------------------------------------------------------------

.. _rebuild_index:

``rebuild_index``
==============================================================================

Running ``./dev rebuild_index`` will rebuild the search indexes.

-----------------------------------------------------------------------------

.. _restart:

``restart``
==============================================================================

Running ``./dev restart`` is a shortcut for running:

- ``./dev end``
- ``./dev start``

More details for each command can be found on this page.

-----------------------------------------------------------------------------

.. _start:

``start``
==============================================================================

Running ``./dev start`` starts the development environment.
It performs the following tasks:

- Build system Docker images if required (see below)
- Start the Django website system
- Start the Nginx server to display the website and static files
- Start the database server

When you run this command for the first time on a computer it will also run ``./dev build`` to build the system Docker images.
This can take some time, roughly 15 to 30 minutes, depending on your computer and internet speed.
Images are only required to be built once, unless the image specifications change (you can rebuild the images with ``./dev build``).
Once the images are built, the script will run these images in containers.

Once the development environment is operational, run the ``./dev update`` command to load the CS Unplugged content.

-----------------------------------------------------------------------------

.. _static:

``static``
==============================================================================

Running ``./dev static`` runs the commands for generating the static files for the website.

If changes are made to the static files (for example, a new image is added) when the system is running, this command needs to be entered to view the new files on the website.

.. _style:

``style``
==============================================================================

Running ``./dev style`` will run the ``flake8`` and ``pydocstyle`` commands to check the style of the project.
If the output is ``0`` for a check, then there are zero errors.

-----------------------------------------------------------------------------

.. _test_backwards:

``test_backwards``
==============================================================================

Running ``./dev test_backwards`` will run the test suite in reverse.
This is useful to check if any tests are influencing the result of each other.
If this command if run on Travis CI, it will only run for a pull request.

-----------------------------------------------------------------------------

.. _test_coverage:

``test_coverage``
==============================================================================

Running ``./dev test_coverage`` will display a table detailing test code coverage, from the report generated by ``./dev test``.

-----------------------------------------------------------------------------

.. _test_specific:

``test_specific``
==============================================================================

Running ``./dev test_specific [MODULE_PATH]`` will run a specific test module.
For example, running ``./dev test_specific tests.resources.views.test_index_view`` will only run the tests for checking the index view of the resources application.

-----------------------------------------------------------------------------

.. _test_suite:

``test_suite``
==============================================================================

Running ``./dev test_suite`` will run the test suite, and create a report detailing test code coverage.
The code coverage report can be displayed by running ``./dev test_coverage``.

-----------------------------------------------------------------------------

.. _update:

``update``
==============================================================================

Running ``./dev update`` performs the following tasks:

- Update the database with the required structure (known as the schema)
- Load the CS Unplugged content into the database
- Create the required static files

Once the script has performed all these tasks, the script will let you know the website is ready.
Open your preferred web browser to the URL ``cs-unplugged.localhost`` to view the website.

In more detail, ``./dev update`` runs the Django ``makemigratations`` and ``migrate`` commands for updating the database schema, and then runs the custom ``updatedata`` command to load the topics content into the database.
It also runs the ``static`` command to generate static files.

If changes are made to the topics content when the system is running, this command needs to be run to view the new changes on the website.

-----------------------------------------------------------------------------

.. _update_data:

``update_data``
==============================================================================

Running ``./dev update_data`` runs the custom ``update_data`` command to load the topics content into the database.

-----------------------------------------------------------------------------

.. _update_static:

``update_static``
==============================================================================

Running ``./dev update_static`` generates and collects static files into the ``staticfiles/`` folder.
This command is equivalent to running ``static`` and then ``collect_static``.

-----------------------------------------------------------------------------

You now know the basic commands for using the CS Field Guide system.
You are now ready to tackle the documentation for the area you wish to contribute on.
Head back to the :doc:`documentation homepage <../index>` and choose the documentation related to the task you wish to contribute to.
