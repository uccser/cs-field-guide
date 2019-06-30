"""Modeltranslation configuration for Interactive application."""

from modeltranslation.translator import translator, TranslationOptions
from interactives.models import Interactive


class InteractiveTranslationOptions(TranslationOptions):
    """Translation options for Interactive model."""

    fields = ("name", "template")


translator.register(Interactive, InteractiveTranslationOptions)
