"""Module for the testing custom Django loadinteractives commands."""

import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from django.core import management
from django.test import tag, override_settings

INTERACTIVES_PATH = "tests/interactives/management/assets/"


@tag("management")
class LoadInteractivesCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    # Test calls to interactives loader

    @mock.patch(
        "interactives.management.commands._InteractivesLoader.InteractivesLoader.load",
        return_value=True
    )
    @override_settings(
        INTERACTIVES_CONTENT_BASE_PATH=os.path.join(INTERACTIVES_PATH, "interactives-valid")
    )
    def test_loadinteractives_interactives_valid(self, interactive_loader):
        management.call_command("loadinteractives")
        self.assertTrue(interactive_loader.called)
