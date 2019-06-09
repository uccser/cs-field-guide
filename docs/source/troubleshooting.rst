Troubleshooting
##############################################################################

``csfg`` helper script
==============================================================================

I get a ``No such file or directory`` error when running the ``csfg`` script
------------------------------------------------------------------------------

Check your terminal working directory is within the ``cs-field-guide`` directory, the root directory of the project.
Running the ``ls`` command in this directory should list the ``csfg`` file.

I have an error when running ``./csfg start``
------------------------------------------------------------------------------

If you are having issues running the ``start`` command, try rebuilding the system images with ``./csfg build``.
Changes may be have been made to the system images since you initally created them.

If this still doesn't solve your problem, you could also try deleting any existing images with ``./csfg wipe``, and then build and start the system with ``./csfg start``.

If issue still persists, log a bug on our `issue tracker`_.

Viewing website
==============================================================================

Images are not displayed when I view the website
------------------------------------------------------------------------------

Firstly check the image is located in the ``staticfiles/`` directory.
If the image isn't located within the directory, check the original image is located within the ``static`` directory.

If the image is located within the ``static/`` directory, check the filepath is correct.
When running ``./csfg update``, the script will report an error if an image cannot be found.

Currently ``./csfg update_static`` removes thumbnail images and is a known issue.
To get them back run ``./csfg update``.

Changed CSS/SCSS styles are not updated when I view the website
------------------------------------------------------------------------------

Firstly check the compiled CSS is located in the ``staticfiles/`` directory, and that the changes have appeared in the compiled CSS file.
If the CSS file does not include the changes made, run ``./csfg update_static``.
If you are editing SCSS files, check the ``./csfg static`` command isn't reporting SCSS compilation errors.

The website isn't displaying when I open ``localhost`` in a browser
----------------------------------------------------------------------------------------------

Check you have run both the ``./csfg start`` and ``./csfg update`` commands (in that order),  and that it hasn't reported any errors.

.. _issue tracker: https://github.com/uccser/cs-field-guide/issues
