Developer Philosophy
##############################################################################

We follow the following philosophy for developing the CS Field Guide project:

  We aim to create software that enables authors to easily create, modify, and share education material for the CS Field Guide project.

In short: *Think of the author*.

This page explains design decisions we made throughout developing the CS Field Guide system.

Configuration Files
==============================================================================

We use `YAML`_ for storing configuration data of content.
It has improved human readability over JSON and XML, especially for authors who have no or little experience with configuration files.

We try to avoid deep nesting (indentation) within configuration files as it's harder for authors to read nested data.
We have split configuration data across multiple configuration files to avoid this issue.

.. _YAML: http://www.yaml.org/spec/1.2/spec.html

Writing Content
==============================================================================

We chose Markdown as the language for text content as it has a great balance between simplicity of writing for authors, and clear structure when converting to HTML.
