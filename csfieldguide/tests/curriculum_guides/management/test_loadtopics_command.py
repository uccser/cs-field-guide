"""Module for the testing custom Django loadcurriculumguides commands."""

import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from django.core import management
from django.test import tag, override_settings
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError

CURRICULUM_GUIDES_PATH = "tests/curriculum_guides/management/assets/"


@tag("management")
class LoadCurriculumGuidesCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    # Test calls to curriculum guide loader

    @mock.patch(
        "curriculum_guides.management.commands._CurriculumGuidesLoader.CurriculumGuidesLoader.load",
        return_value=True
    )
    @override_settings(
        CURRICULUM_GUIDES_CONTENT_BASE_PATH=os.path.join(CURRICULUM_GUIDES_PATH, "curriculum_guides-valid")
    )
    def test_loadcurriculumguides_curriculum_guides_valid(self, curriculum_guide_loader):
        management.call_command("loadcurriculumguides")
        self.assertTrue(curriculum_guide_loader.called)

    @mock.patch(
        "curriculum_guides.management.commands._CurriculumGuidesLoader.CurriculumGuidesLoader.load",
        return_value=True
    )
    @override_settings(
        CURRICULUM_GUIDES_CONTENT_BASE_PATH=os.path.join(CURRICULUM_GUIDES_PATH, "curriculum_guides-missing")
    )
    def test_loadcurriculumguides_curriculum_guides_missing(self, curriculum_guide_loader):
        self.assertRaises(
            MissingRequiredFieldError,
            management.call_command,
            "loadcurriculumguides"
        )

    @mock.patch(
        "curriculum_guides.management.commands._CurriculumGuidesLoader.CurriculumGuidesLoader.load",
        return_value=True
    )
    @override_settings(
        CURRICULUM_GUIDES_CONTENT_BASE_PATH=os.path.join(CURRICULUM_GUIDES_PATH, "curriculum_guides-empty")
    )
    def test_loadcurriculumguides_curriculum_guides_empty(self, curriculum_guide_loader):
        self.assertRaises(
            MissingRequiredFieldError,
            management.call_command,
            "loadcurriculumguides"
        )

    @mock.patch(
        "curriculum_guides.management.commands._CurriculumGuidesLoader.CurriculumGuidesLoader.load",
        return_value=True
    )
    @override_settings(
        CURRICULUM_GUIDES_CONTENT_BASE_PATH=os.path.join(CURRICULUM_GUIDES_PATH, "curriculum_guides-number-missing")
    )
    def test_loadcurriculumguides_curriculum_guides_number_missing(self, curriculum_guide_loader):
        self.assertRaises(
            MissingRequiredFieldError,
            management.call_command,
            "loadcurriculumguides"
        )

    @mock.patch(
        "curriculum_guides.management.commands._CurriculumGuidesLoader.CurriculumGuidesLoader.load",
        return_value=True
    )
    @override_settings(
        CURRICULUM_GUIDES_CONTENT_BASE_PATH=os.path.join(CURRICULUM_GUIDES_PATH, "curriculum_guides-number-invalid")
    )
    def test_loadcurriculumguides_curriculum_guides_number_invalid(self, curriculum_guide_loader):
        self.assertRaises(
            InvalidYAMLValueError,
            management.call_command,
            "loadcurriculumguides"
        )
