"""Module for the testing custom Django loadchapters commands."""

import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from django.core import management
from django.test import tag, override_settings
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError

CHAPTERS_PATH = "tests/chapters/management/assets/"


@tag("management")
class LoadChaptersCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    # Test calls to glossary terms loader

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "glossary-terms-valid")
    )
    def test_loadchapters_glossary_terms_valid(self, chapter_loader, glossary_loader):
        management.call_command("loadchapters")
        self.assertTrue(glossary_loader.called)

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "glossary-terms-missing")
    )
    def test_loadchapters_glossary_terms_missing(self, chapter_loader, glossary_loader):
        management.call_command("loadchapters")
        self.assertFalse(glossary_loader.called)

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "glossary-terms-empty")
    )
    def test_loadchapters_glossary_terms_empty(self, chapter_loader, glossary_loader):
        management.call_command("loadchapters")
        self.assertFalse(glossary_loader.called)

    # Test calls to chapter loader

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "chapters-valid")
    )
    def test_loadchapters_chapters_valid(self, chapter_loader, glossary_loader):
        management.call_command("loadchapters")
        self.assertTrue(chapter_loader.called)

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "chapters-missing")
    )
    def test_loadchapters_chapters_missing(self, chapter_loader, glossary_loader):
        self.assertRaises(
            MissingRequiredFieldError,
            management.call_command,
            "loadchapters"
        )

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "chapters-empty")
    )
    def test_loadchapters_chapters_empty(self, chapter_loader, glossary_loader):
        self.assertRaises(
            MissingRequiredFieldError,
            management.call_command,
            "loadchapters"
        )

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "chapters-number-missing")
    )
    def test_loadchapters_chapters_number_missing(self, chapter_loader, glossary_loader):
        self.assertRaises(
            MissingRequiredFieldError,
            management.call_command,
            "loadchapters"
        )

    @mock.patch(
        "chapters.management.commands._GlossaryTermsLoader.GlossaryTermsLoader.load",
        return_value=True
    )
    @mock.patch(
        "chapters.management.commands._ChaptersLoader.ChaptersLoader.load",
        return_value=True
    )
    @override_settings(
        CHAPTERS_CONTENT_BASE_PATH=os.path.join(CHAPTERS_PATH, "chapters-number-invalid")
    )
    def test_loadchapters_chapters_number_invalid(self, chapter_loader, glossary_loader):
        self.assertRaises(
            InvalidYAMLValueError,
            management.call_command,
            "loadchapters"
        )
