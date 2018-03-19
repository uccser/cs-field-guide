"""Module containing utility functions for internationalization."""

from django.conf import settings


def get_available_languages():
    """Return the list of language codes defined in django settings."""
    return [code for code, name in settings.LANGUAGES]


def get_default_language():
    """Return the language code of the default language."""
    return settings.LANGUAGE_CODE
