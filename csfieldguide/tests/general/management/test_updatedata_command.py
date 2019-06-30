"""Module for the testing custom Django commands."""

from tests.BaseTestWithDB import BaseTestWithDB
from django.conf import settings
from django.core import management
from django.test import tag, override_settings


@tag("management")
@override_settings(LANGUAGES=settings.ORIGINAL_DEFAULT_LANGUAGES)
class ManagementCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_updatedata_command(self):
        management.call_command("updatedata")
