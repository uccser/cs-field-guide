Website Design (HTML templates/CSS)
##############################################################################

This page covers the HTML templates and CSS styling used for the Computer Science Field Guide website.

In summary:

- We use Bootstrap 4 for the underlying framework for responsive design.
- We use SCSS for style sheets where possible.
- We wrap translatable strings in `{% trans %}` or `{% blocktrans %}` tags.
- When interactives are viewed in whole page mode they should be centered.
- We aim for the website to be as accessible as possible via accessible features.

Setting Custom Converter Templates
==============================================================================
We use Verto to convert Markdown files to HTML. To override a default Verto template, add a new HTML file to ``utils/custom_converter_templates/<processor-name>.html``.

The template file name must correspond to the name of a processor in Verto (for example: ``image.html``, or the name of a supporting template specified in Verto documentation (for example: ``relative-image-link.html``).
A list of the available processors is available in the `Verto Documentation`_.

Notes for Writing Custom Converter Templates
------------------------------------------------------------------------------

All HTML element attributes must contain a value.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following snippet from a custom template would result in an error:

.. code-block:: html

    <details open>

The line would need to be written as this:

.. code-block:: html

    <details open="open">

Translation tags must be separate line.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If any Django translation tags are included in a template, it must first be escaped using ``{{ ' ' }}``.
For the Django ``makemessages`` command to detect the translation tag, the tag must be on its own line (whitespace before the tag doesn't matter).

The following is an example of how to do this:

.. code-block:: django


    <span class="panel-type-title">
        {{-'
            {% trans "Teacher Note" %}
        '-}}
    </span>

.. _Verto Documentation: https://verto.readthedocs.io/en/latest/
