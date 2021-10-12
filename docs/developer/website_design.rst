Website Design (HTML templates/CSS)
##############################################################################

This page covers the HTML templates and CSS styling used for the CS Field Guide website.

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

.. _Verto Documentation: https://verto.readthedocs.io/en/latest/
