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

    fields = ("name",)


class SubappendixTranslationOptions(TranslationOptions):
    """Translation options for Subappendix model."""

    fields = ("name",)


translator.register(Appendix, AppendixTranslationOptions)
translator.register(Subappendix, SubappendixTranslationOptions)
