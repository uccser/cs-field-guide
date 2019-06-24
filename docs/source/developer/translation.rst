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
Translatable content is stored in three types of files:

- Markdown files, for content to be processed by Verto.
- Python code.
- HTML templates.
- JavaScript code.

Markdown files are stored inside the directory tree for a given language (ie. the directory named using the Django locale code).

For the other three type of files, Django's built-in `translation support <https://docs.djangoproject.com/en/2.0/topics/i18n/>`_ is utilised to handle translatable strings.
In Python code, text is wrapped in a ``ugettext`` function call (usually aliased to ``_``).
In HTML templates, text is wrapped in ``{% trans %}``/``{% blocktrans %}`` tags.
In JavaScript code, text is wrapped in a ``gettext`` function call.


Sometimes there may be a sentence that will need to be worded differently depending on the value of a variable.
In HTML templates, the Django ``blocktrans`` tag provides for pluralisation.
An example is shown below.

.. code-block:: html

  {% blocktrans count variable as variable_name %}
      The video has been viewed <span>{{ variable_name }}</span> time
      {% plural %}
      The video has been viewed <span>{{ variable_name }}</span> times
  {% endblocktrans %}

`Django documentation for using the plural tag is here`_.


Django provides two different functions for handling pluralisation in JavaScript.
If the variable value is not included in the sentence you can simply use Django's ``ngettext`` function.
However if the variable value `is` included in the sentence you will need to use both Django's ``ngettext`` function and Django's ``interpolate`` function.


For example, in the binary cards interactive the user can flip cards to show a number of dots.
In the interactive we tell the user how many dots are showing, if there is only one dot showing we would like to display "1 dot is visible", otherwise display the plural version with the number of dots showing.
To achieve this we use the following syntax, where ``dot_count`` is the number of dots showing.

.. code-block:: javascript

    var format = ngettext('1 dot is visible', '%(dot_count)s dots are visible', dotCount);
    var dotCountText = interpolate(format, {"dot_count": dotCount}, true);

Django provides further documentation on these funcitons and `translations in JavaScript here`_.


Translatable Model
=============================================================================

The ``TranslatableModel`` class is a base model class that allows content to be stored using the above principles.
It is availabe in the file ``utils/TranslatableModel.py`` and should be subclassed by all models which contain any user-facing content.

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

.. _translations in JavaScript here: https://docs.djangoproject.com/en/1.11/topics/i18n/translation/#using-the-javascript-translation-catalog
.. _Django documentation for using the plural tag is here: https://docs.djangoproject.com/en/1.11/topics/i18n/translation/#blocktrans-template-tag
