"""Module for the testing custom Django rebuild_index command."""

from os.path import join, dirname
from os import makedirs
from shutil import rmtree
from django.conf import settings
from django.core import management
from django.test import tag
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator

BASE_PATH = "tests/search/management/"
test_template_settings = settings.TEMPLATES
default_path = test_template_settings[0]["DIRS"][0]
new_path = join(dirname(default_path), BASE_PATH, "templates/")
test_template_settings[0]["DIRS"].append(new_path)


@tag("management")
class ManagementCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"
        self.chapters_test_data = ChaptersTestDataGenerator()

    def setUp(self):
        """Automatically called before each test."""
        super().setUp()
        makedirs(settings.SEARCH_INDEX_PATH, exist_ok=True)

    def tearDown(self):
        """Automatically called after each test."""
        rmtree(settings.SEARCH_INDEX_PATH)
        super().tearDown()

    def test_rebuild_index_command_no_items(self):
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_chapter_model(self):
        self.chapters_test_data.create_chapter(1)
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_chapter_section_model(self):
        chapter = self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter_section(chapter, 1)
        management.call_command("rebuild_index", "--noinput")
