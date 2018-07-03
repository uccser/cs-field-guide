"""Module for the testing custom Django rebuild_index command."""

from os.path import join, dirname
from django.conf import settings
from django.test import override_settings
from django.core import management
from django.test import tag
from django.template.exceptions import TemplateSyntaxError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.resources.ResourcesTestDataGenerator import ResourcesTestDataGenerator
from classic.models import ClassicPage
from general.models import GeneralPage

BASE_PATH = "tests/search/management/assets/"
test_template_settings = settings.TEMPLATES
default_path = test_template_settings[0]["DIRS"][0]
new_path = join(dirname(default_path), BASE_PATH, "templates/")
test_template_settings[0]["DIRS"].append(new_path)


@tag("management")
class ManagementCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"
        self.test_data = ChaptersTestDataGenerator()

    def test_rebuild_index_command_no_items(self):
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_topic_model(self):
        self.test_data.create_topic(1)
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_unit_plan_model(self):
        topic = self.test_data.create_topic(1)
        self.test_data.create_unit_plan(topic, 1)
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_lesson_model(self):
        topic = self.test_data.create_topic(1)
        unit_plan = self.test_data.create_unit_plan(topic, 1)
        age_group_1 = self.test_data.create_age_group(5, 7)
        self.test_data.create_lesson(
            topic,
            unit_plan,
            1,
            age_group_1
        )
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_curriculum_integration_model(self):
        topic = self.test_data.create_topic(1)
        self.test_data.create_integration(topic, 1)
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_programming_challenge_model(self):
        topic = self.test_data.create_topic(1)
        difficulty = self.test_data.create_difficulty_level(1)
        language = self.test_data.create_programming_language(1)
        challenge = self.test_data.create_programming_challenge(topic, 1, difficulty)
        self.test_data.create_programming_challenge_implementation(
            topic,
            language,
            challenge,
        )
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_resource_model(self):
        resources_test_data = ResourcesTestDataGenerator()
        resources_test_data.create_resource(
            "grid",
            "Grid",
            "resources/grid.html",
            "GridResourceGenerator",
        )
        management.call_command("rebuild_index", "--noinput")

    def test_rebuild_index_command_classic_page_model(self):
        page = ClassicPage(
            slug="page",
            name="Page",
            redirect="http://www.example.com",
        )
        page.save()
        management.call_command("rebuild_index", "--noinput")

    @override_settings(TEMPLATES=test_template_settings)
    def test_rebuild_index_command_general_page_model(self):
        page = GeneralPage(
            slug="page",
            name="Page",
            template="template.html",
            url_name="url",
        )
        page.save()
        management.call_command("rebuild_index", "--noinput")

    @override_settings(TEMPLATES=test_template_settings)
    def test_rebuild_index_command_general_page_with_invalid_template(self):
        page = GeneralPage(
            slug="page",
            name="Page",
            template="template_without_id.html",
            url_name="url",
        )
        page.save()
        self.assertRaises(
            TemplateSyntaxError,
            management.call_command,
            "rebuild_index",
            "--noinput"
        )

    def test_rebuild_index_command_multiple_models(self):
        topic = self.test_data.create_topic(1)
        unit_plan = self.test_data.create_unit_plan(topic, 1)
        age_group_1 = self.test_data.create_age_group(5, 7)
        self.test_data.create_lesson(
            topic,
            unit_plan,
            1,
            age_group_1
        )
        management.call_command("rebuild_index", "--noinput")
