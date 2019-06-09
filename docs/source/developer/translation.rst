Translation
##############################################################################


Translation Principles
=============================================================================

The following principles were used to guide the design of a translation system for CS Field Guide:

1. Translations should be 'first class citizens' - they should exist as independent entities from the source content, and be coupled as loosely as possible to it.
2. Translated content should remain accessible even if the source material changes, and an updated translation is not yet available.
3. Users should be able to see all content that exists, even if it is not available in their language.
4. Translated content should be presented solely in the users language, without being interspersed with English.


Translatable Files
=============================================================================
Translatable content is stored in five types of files:

- Markdown files, for content to be processed by Verto.
- YAML files containg field translations for a given model type.
- HTML templates.
- Python code.
- JavaScript code.

The first two types of file are stored inside the directory tree for a given language (ie. the directory named using the Django locale code).

.. note::

  YAML translation files must contain translations for only one model type, but may contain translations for multiple instances of that model, and for multiple fields.

  They are structured as follows

  .. code-block:: yaml

    <object-slug-1>:
        <field-1>: <translated value for field-1>
        <field-2>: <translated value for field-2>
    <object-slug-2>

  For example, the following snippet is from the YAML translation file for all classroom resources

  .. code-block:: yaml

    pens:
      description:  Pens
    paper:
      description:  Paper
    number-line-0-20:
      description:  Number line from 0 to 20

  It is important to note that these YAML files are separate from `configuration files <understanding_configuration_files>`_, which are located in the ``structure`` directory.

  These files can be parsed and loaded using a `utility function <UtilityFunctions_>`_ on the ``TranslatableModelLoader`` base class.

For the other three type of files, Django's built-in `translation support <https://docs.djangoproject.com/en/2.0/topics/i18n/>`_ is utilised to handle translatable strings.
In Python code, text is wrapped in a ``ugettext`` function call (usually aliased to ``_``).
In HTML templates, text is wrapped in ``{% trans %}``/``{% blocktrans trimmed %}`` tags.
In JavaScript code, text is wrapped in a ``gettext`` function call.


Translatable Model
=============================================================================

The ``TranslatableModel`` class is a base model class that allows content to be stored using the above principles.
It is availabe in the file ``utils/TranslatableModel.py`` and should be subclassed by all models which contain any user facing content.

Django Package - ``modeltranslation``
******************************************************************************
The Django modeltranslation package is utilised to stored translated content on a model.
The basic idea is that for each translatable field, an extra database column is added for every language defined in the Django settings file.
When the base field is accessed, ``modeltranslation`` performs some magic to retrieve the translation for the users language.


To register translation fields for a given TranslatableModel, add a TranslationOptions subclass to the ``translations.py`` file in the relevant application.
For more details, see the models already registered, or read the `modeltranslation docs <http://django-modeltranslation.readthedocs.io/en/latest/registration.html>`_.

.. note::

  The default behaviour for ``modeltranslation`` is to fallback to the English value if no translation is present.
  In CS field Guide, this is desirable for text fields such as name and title, but is often undesirable for most other fields (see `Translation Principles`_).

  To disable fallback for a given field:

  - Add ``<field name>: None`` to the ``fallback_undefined`` dictionary in the models ``TranslationOptions`` subclass.
  - Add ``default=""`` option to the field in it's ``models.py`` definition.


Available Languages
******************************************************************************

The ``TranslatableModel`` base class includes a mechanism to determine whether a model sufficiently translated and available in a given language.

This mechanism consists of

- The ``languages`` field, which is an array field storing the Django language codes for languages in which the model is available.
- The ``translation_available`` property, which returns true if the model is available in the current language.

When creating the ``TranslatableModel`` instance, the list of available languages should be determined.
This will likely be decided using a list of required fields, where the presence of translations for all required fields leads to the model being marked as available.
The `TranslatableModelLoader <TranslatableModelLoader_>`_ base class includes functions to assist with this task.

In view and template code, the ``translation_available`` property can be checked to determine the presentation of translated content (or lack thereof) on the front end.


.. _TranslatableModelLoader:

Translatable Model Loader
=============================================================================

The ``TranslatabaleModelLoader`` base class should be subclassed by all loaders that deal with translatable models.
It provides a number of helper functions for dealing with translated content.
It is availabe in the file ``utils/TranslatableModelLoader.py``.

.. _UtilityFunctions:

Utility Functions
******************************************************************************

The following utility functions are available:

- ``get_yaml_translations`` - Load translations for model fields from a given YAML file.
- ``get_markdown_translations`` - Load translations for a given Markdown file.
- ``populate_translations`` - Populate translation fields on a model using values in a given dictionary.
- ``mark_translation_availability`` - Modify ``languages`` field to contain all languages for which all required translation fields are populated.

Refer to the function docstrings for more detailed documentation.
It may also be useful to refer to existing loader implementations to understand how these functions can be used.
