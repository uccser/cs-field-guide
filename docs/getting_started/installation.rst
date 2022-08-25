Installation Guide
#################################################

Please read our `installation guide`_  within our `UCCSER Documentation`_ to set your machine up for working on the CS Field Guide project.

.. _installation-check-project-setup-works:

Step 9: Check Project Setup Works
=================================================

To check the project works, open a terminal in the project root directory, which is the ``cs-field-guide/`` directory (should contain a file called ``dev``).

Type the following command into the terminal (we cover this command in more detail on the helper commands page):

.. code-block:: bash

    $ ./dev start

If this is the first time you're running this script it will need to build system images.
This may take some time (roughly 5 to 30 minutes), depending on your computer and internet speed.

Once the ``./dev start`` command has completed, you will need to run the update command.
Type the following into your terminal:

    .. code-block:: bash

        $ ./dev update

You can find information about this command on the helper commands page.

Once the update command has completed you should then be able to open your preferred web browser to the URL ``cs-field-guide.localhost`` and see the CS Field Guide homepage.

Congratulations if you made it this far and everything is working, you're all set to contribute to the CS Field Guide project.

.. _UCCSER Documentation: https://uccser.github.io/
.. _installation guide: https://uccser.github.io/technical-documentation/installation-guide/
