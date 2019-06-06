Helper Commands for Developing
##############################################################################

.. note::

  We assume by this point you have installed the project, checked the
  setup is working (see :ref:`installation-check-project-setup-works`),
  and also have a basic understanding of the
  :doc:`project structure <project_structure>`.

The CS Field Guide project uses many systems (Django, Docker, Gulp, etc) to run,
so we have written a script for running groups of commands for running the
system while developing.

The script is called ``csfg`` and can be found in the ``cs-field-guide`` folder
of the repository.
To run this script, open a terminal window in the directory and enter the
following command (you don't need to enter the ``$`` character, this shows
the start of your terminal prompt):

.. code-block:: bash

    $ ./csfg [COMMAND]

Where ``[COMMAND]`` is a word from the list below:

- :ref:`build`
- :ref:`clean`
- :ref:`end`
- :ref:`flush`
- :ref:`help`
- :ref:`logs`
- :ref:`makemigrations`
- :ref:`migrate`
- :ref:`restart`
- :ref:`shell`
- :ref:`start`
- :ref:`static`
- :ref:`static_prod`
- :ref:`style`
- :ref:`test`
- :ref:`test_backwards`
- :ref:`test_coverage`
- :ref:`test_specific`
- :ref:`update`
- :ref:`updatedata`
- :ref:`wipe`


All users of the project (content and technical developers) should become
familiar with the following commands:

- :ref:`start`
- :ref:`end`
- :ref:`build`
- :ref:`update`

-----------------------------------------------------------------------------

.. _build:

``build``
==============================================================================

Running ``./csfg build`` will build or rebuild the Docker images that are
required for the CS Field Guide system.

-----------------------------------------------------------------------------

.. _clean:

``clean``
==============================================================================

Running ``./csfg clean`` deletes 'dangling' Docker images left over from builds,
which will free up hard drive space.

-----------------------------------------------------------------------------

.. _logs:

``logs``
-----------------------------------------------------------------------------

Running ``./csfg logs`` will display the logs for the running systems.
The output is for all logs until the time the command was run, therefore
successive calls may display new logs.

To follow logs as they output, enter ``docker-compose logs --follow``.

.. _flush:

``flush``
-----------------------------------------------------------------------------

Running ``./csfg flush`` runs the Django ``flush`` command to flush
the database.

.. _makemigrations:

``makemigrations``
-----------------------------------------------------------------------------

Running ``./csfg makemigrations`` runs the Django ``makemigrations`` command
to create migration files.

.. _migrate:

``migrate``
-----------------------------------------------------------------------------

Running ``./csfg migrate`` runs the Django ``migrate`` command
to apply migration files.

.. _shell:

``shell``
-----------------------------------------------------------------------------

Running ``./csfg shell`` opens a bash terminal within the Django container
(this requires the CS Field Guide system to be running).

This is the equivalent to entering ``docker-compose run django bash``.

.. _static:

``static``
-----------------------------------------------------------------------------

Running ``./csfg static`` runs the commands for generating the static files
for the website.

If changes are made to the static files (for example, a new image is added)
when the system is running, this command needs to be entered to view the
new files on the website.

.. _static_prod:

``static_prod``
-----------------------------------------------------------------------------

Running ``./csfg static_prod`` runs the commands for generating production
static files for the website.
This produces compressed SASS files without sourcemaps.

.. _style:

``style``
-----------------------------------------------------------------------------

Running ``./csfg style`` will run the ``flake8`` and ``pydocstyle`` commands
to check the style of the project.
If the output is ``0`` for a check, then there are zero errors.

.. _test:

``test``
-----------------------------------------------------------------------------

Running ``./csfg test`` will run the test suite, and create a report
detailing test code coverage.
The code coverage report can be displayed by running
``./csfg test_coverage``.

.. _test_backwards:

``test_backwards``
-----------------------------------------------------------------------------

Running ``./csfg test_backwards`` will run the test suite in reverse.
This is useful to check if any tests are influencing the result of each other.
If this command if run on Travis CI, it will only run for a pull request.

.. _test_coverage:

``test_coverage``
-----------------------------------------------------------------------------

Running ``./csfg test_coverage`` will display a table detailing test code
coverage, from the report generated by ``./csfg test``.

.. _test_specific:

``test_specific``
-----------------------------------------------------------------------------

Running ``./csfg test_specific [MODULE_PATH]`` will run a specific test
module.
For example, running
``./csfg test_specific tests.resources.views.test_index_view`` will only
run the tests for checking the index view of the resources application.

.. _updatedata:

``updatedata``
-----------------------------------------------------------------------------

Running ``./csfg updatedata`` runs the custom ``updatedata`` command to
load the topics content into the database.

-----------------------------------------------------------------------------

.. _end:

``end``
==============================================================================

Running ``./csfg end`` will stop any containers which are currently running,
this usually takes 10 to 20 seconds.

-----------------------------------------------------------------------------

.. _help:

``help``
==============================================================================

Running ``./csfg help`` displays brief help text for the script.
More details for each command can be found on this page.

-----------------------------------------------------------------------------

.. _restart:

``restart``
==============================================================================

Running ``./csfg restart`` is a shortcut for running:

- ``./csfg end``
- ``./csfg start``

More details for each command can be found on this page.

-----------------------------------------------------------------------------

.. _start:

``start``
==============================================================================

Running ``./csfg start`` starts the development environment.
When you run this command for the first time on a computer it will also run
``./csfg build`` to build the system Docker images.
This can take some time, roughly 15 to 30 minutes, depending on your computer
and internet speed.
Images are only required to be built once, unless the image specifications
change (you can rebuild the images with ``./csfg build``).
Once the images are built, the script will run these images in containers.

Once the development environment is operational, the script will perform the
following tasks:

- Start the Django website system
- Start the Nginx server to display the website and static files
- Start the database server
- Update the database with the required structure (known as the schema)
- Load the CS Field Guide content into the database
- Create the required static files

Once the script has performed all these tasks, the script will let you know
the website is ready.
Open your preferred web browser to the URL ``localhost`` to view the website.

-----------------------------------------------------------------------------

.. _update:

``update``
==============================================================================

Running ``./csfg update`` runs the Django ``makemigratations`` and ``migrate``
commands for updating the database schema, and then runs the custom
``updatedata`` command to load the topics content into the database.
It also runs the ``static`` command to generate static files.

If changes are made to the topics content when the system is running, this
command needs to be run to view the new changes on the website.

-----------------------------------------------------------------------------

.. _wipe:

``wipe``
==============================================================================

Running ``./csfg wipe`` delete all Docker containers and images on your computer.
Once this command has be run, a full download and rebuild of images is
required to run the system (can be triggered by the ``build`` or ``start``
commands).

-----------------------------------------------------------------------------

You now know the basic commands for using the CS Field Guide system.
You are now ready to tackle the documentation for the area you wish to
contribute on.
Head back to the :doc:`documentation homepage <../index>` and choose the documentation related
to the task you wish to contribute to.
