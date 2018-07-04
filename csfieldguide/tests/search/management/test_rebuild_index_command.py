"""Module for the testing custom Django rebuild_index command."""

from os.path import join, dirname
from os import makedirs
from shutil import rmtree
from django.conf import settings
from django.test import override_settings
from django.core import management
from django.test import tag
from django.template.exceptions import TemplateSyntaxError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.appendices.AppendicesTestDataGenerator import AppendicesTestDataGenerator

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
        self.appendices_test_data = AppendicesTestDataGenerator()

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

    def test_rebuild_index_command_appendix_model(self):
        self.appendices_test_data.create_appendix(1, "appendix-1.html")
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_subappendix_model(self):
        appendix = self.appendices_test_data.create_appendix(1, "appendix-1.html")
        self.appendices_test_data.create_subappendix(appendix, 1, "appendix-1.html")
        management.call_command("rebuild_index", "--noinput")

    @override_settings(TEMPLATES=test_template_settings)
    def test_rebuild_index_command_appendix_with_invalid_template(self):
        self.appendices_test_data.create_appendix(1, "appendix-without-id.html")
        self.assertRaises(
            TemplateSyntaxError,
            management.call_command,
            "rebuild_index",
            "--noinput"
        )

    @override_settings(TEMPLATES=test_template_settings)
    def test_rebuild_index_command_subappendix_with_invalid_template(self):
        appendix = self.appendices_test_data.create_appendix(1, "appendix-1.html")
        self.appendices_test_data.create_subappendix(appendix, 1, "appendix-without-id.html")
        self.assertRaises(
            TemplateSyntaxError,
            management.call_command,
            "rebuild_index",
            "--noinput"
        )
