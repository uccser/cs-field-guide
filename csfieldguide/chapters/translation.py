"""Translation options for localised models.

Utilised by django-modeltranslation. See http://django-modeltranslation.readthedocs.io
"""

from modeltranslation.translator import translator, TranslationOptions
from chapters.models import (
    Chapter,
    ChapterSection,
    GlossaryTerm,
)


class ChapterTranslationOptions(TranslationOptions):
    """Translation options for Chapter model."""

    fields = ("name", "introduction")
    fallback_undefined = {
        "introduction": None,
    }


class ChapterSectionTranslationOptions(TranslationOptions):
    """Translation options for ChapterSection model."""

    fields = ("name", "content")
    fallback_undefined = {
        "content": None,
    }


class GlossaryTermTranslationOptions(TranslationOptions):
    """Translation options for GlossaryTerm model."""

    fields = ("term", "definition")
    fallback_undefined = {
        "term": None,
        "definition": None
    }


translator.register(Chapter, ChapterTranslationOptions)
translator.register(ChapterSection, ChapterSectionTranslationOptions)
translator.register(GlossaryTerm, GlossaryTermTranslationOptions)
