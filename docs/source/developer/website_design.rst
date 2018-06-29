Website Design (HTML templates/CSS)
##############################################################################

This page covers the HTML templates and CSS styling used for the CS Field Guide
website.

.. warning::

  The current design of the website is a work in progress.

  Expect **everything** to change.


Setting Custom Converter Templates
==============================================================================
We use Verto to convert Markdown files to HTML. To override a default Verto
template, add a new HTML file to ``utils/custom_converter_templates/<processor-name>.html``.

The template file name must correspond to the name of a processor in Verto
(for example: ``image.html``, or the name of a supporting template specified in
Verto documentation (for example: ``relative-image-link.html``).
A list of the available processors is available in the `Verto Documentation`_.

.. _Verto Documentation: http://verto.readthedocs.io/en/master/processors/index.html#available-processos
