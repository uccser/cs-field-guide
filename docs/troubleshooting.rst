Troubleshooting
##############################################################################

``dev`` helper script
==============================================================================

I get a ``No such file or directory`` error when running the ``dev`` script
------------------------------------------------------------------------------

Check your terminal working directory is within the ``cs-field-guide`` directory, the root directory of the project.
Running the ``ls`` command in this directory should list the ``dev`` file.

I have an error when running ``./dev start``
------------------------------------------------------------------------------

If you are having issues running the ``start`` command, try rebuilding the system images with ``./dev build``.
Changes may be have been made to the system images since you initally created them.

If issue still persists, log a bug on our `issue tracker`_.

Viewing website
==============================================================================

Images are not displayed when I view the website
------------------------------------------------------------------------------

Firstly check the image is located in the ``staticfiles/`` directory.
If the image isn't located within the directory, check the original image is located within the ``static`` directory.

If the image is located within the ``static/`` directory, check the filepath is correct.
When running ``./dev update``, the script will report an error if an image cannot be found.

Changed CSS/SCSS styles are not updated when I view the website
------------------------------------------------------------------------------

Check the logs of the Node container processing the static files with ``./dev logs -f node``.

The website isn't displaying when I open ``cs-field-guide.localhost`` in a browser
----------------------------------------------------------------------------------------------

Check you have run both the ``./dev start`` and ``./dev update`` commands (in that order),  and that it hasn't reported any errors.

.. _issue tracker: https://github.com/uccser/cs-field-guide/issues
