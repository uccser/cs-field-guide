"""Translation options for localised models.

Utilised by django-modeltranslation. See http://django-modeltranslation.readthedocs.io
"""

from modeltranslation.translator import translator, TranslationOptions
from appendices.models import (
    Appendix,
    Subappendix,
)


class AppendixTranslationOptions(TranslationOptions):
    """Translation options for Appendix model."""

    fields = ("name")
    fallback_undefined = {
        "name": None,
    }


class SubappendixTranslationOptions(TranslationOptions):
    """Translation options for Subpage model."""

    fields = ("name")
    fallback_undefined = {
        "name": None,
    }


# translator.register(Appendix, AppendixTranslationOptions)
# translator.register(Subappendix, SubappendixTranslationOptions)
