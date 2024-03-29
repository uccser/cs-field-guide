.. _static files:

Static Files
##############################################################################

The static files (images, CSS, JavaScript, etc) used within the website go through the following steps:

1. Files are stored within the ``static`` directory.
2. Files are processed with a Gulpfile into the ``build`` directory with ``./dev static`` or ``./dev static_prod``.
3. Files are collected into the ``staticfiles`` directory with ``./dev collect_static``.

Note that files under the ``static/`` folder are editable and the files under the ``staticfiles/`` folder are generated and should not be edited.
Every interactive has a generated thumbnail stored in ``staticfiles/img/interactives/thumbnails/``.
These can be created with ``./dev make_interactive_thumbnails``.
You will need to run the ``./dev collect_static`` command after for them to appear in the ``staticfiles/`` directory.

JavaScript Files
==============================================================================

JavaScript files are processed with `Browserify <http://browserify.org/>`_ to allow loading modules from NPM.

Any modules used must be listed with a ``package.json`` file within the directory, with the ``package.json`` file listed in the ``csfieldguide/package.json`` file (see examples already within this file).

If you wish to not apply optimisation steps (`Browserify <http://browserify.org/>`_, minification, etc), then list the files within the ``js_files_skip_optimisation`` constant within ``csfieldguide/gulpfile.js``.

Any files within the ``csfieldguide/static/js/modules/`` directory are skipped by the Gulpfile and not processed by themselves.
Module files can be required by other JavaScript files to be included.

If NPM modules are added, modified, or deleted, the Docker images will need to be rebuilt using ``./dev build node``.

Django's `JavaScript translation catalog <https://docs.djangoproject.com/en/1.11/topics/i18n/translation/#internationalization-in-javascript-code>`_ enables the use of gettext() in JavaScript files to translate text.
The JavaScript translation files are prepared before server start.

Node dependencies
==============================================================================

Multiple sets of Node dependencies are installed throughout the project using ``package.json`` files.
This includes a high level ``package.json`` file for website dependencies at ``csfieldguide/``, and then more ``package.json`` files within the ``csfieldguide/static/interactives/`` directory.

We have chosen to install Node dependencies within the Docker container, however we have the installed dependencies excluded from the Docker Compose volume that maps the developer's local directory within the container.

Each separate ``node_modules`` is specified individually (within ``docker-compose.local.yml`` and ``infrastructure/local/django/Dockerfile``), as the Docker volume of the website dependencies (would be ``csfieldguide/node_modules``) would hide the ``node_modules`` directory for each interactive's dependencies, therefore resulting in interactives looking at the top level ``node_modules`` directory for dependencies.`
This meant that some interactives were using versions on dependencies that they were not intended for.
