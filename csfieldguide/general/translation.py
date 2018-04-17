"""Translation options for localised models.

Utilised by django-modeltranslation. See http://django-modeltranslation.readthedocs.io
"""

from modeltranslation.translator import translator, TranslationOptions
from general.models import (
    GeneralPage,
    GeneralSubpage,
)


class GeneralPageTranslationOptions(TranslationOptions):
    """Translation options for GeneralPage model."""

    fields = ("name")
    fallback_undefined = {
        "name": None,
    }


class GeneralSubpageTranslationOptions(TranslationOptions):
    """Translation options for Subpage model."""

    fields = ("name")
    fallback_undefined = {
        "name": None,
    }


# translator.register(GeneralPage, GeneralPageTranslationOptions)
# translator.register(GeneralSubpage, GeneralSubpageTranslationOptions)
