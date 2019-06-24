from os.path import join, dirname
from http import HTTPStatus
from os import makedirs
from shutil import rmtree
from django.urls import reverse
from django.conf import settings
from django.core import management
from django.test import override_settings
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.helpers import query_string

BASE_PATH = "tests/search/views/"
test_template_settings = settings.TEMPLATES
default_path = test_template_settings[0]["DIRS"][0]
new_path = join(dirname(default_path), BASE_PATH, "templates/")
test_template_settings[0]["DIRS"].append(new_path)


@override_settings(TEMPLATES=test_template_settings)
class IndexViewTest(BaseTestWithDB):

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

    # No query

    def test_search_view_with_no_query_with_index(self):
        self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter(2)
        self.chapters_test_data.create_chapter(3)
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertFalse(response.context["object_list"])
        self.assertEqual(response.context.get("query"), "")

    def test_search_view_with_no_query_with_no_index(self):
        url = reverse("search:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertFalse(response.context["object_list"])
        self.assertEqual(response.context.get("query"), "")

    # Context

    def test_search_view_context_model_data(self):
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        response = self.client.get(url)
        self.assertEqual(
            response.context["models"],
            [
                {
                    "value": "chapters.chaptersection",
                    "name": "Chapter sections"
                },
                {
                    "value": "chapters.chapter",
                    "name": "Chapters"
                },
            ]
        )

    def test_search_view_context_model_data_with_selected(self):
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        get_parameters = [
            ("models", "chapters.chapter"),
        ]
        url += query_string(get_parameters)
        response = self.client.get(url)
        self.assertEqual(
            response.context["models"],
            [
                {
                    "value": "chapters.chaptersection",
                    "name": "Chapter sections",
                },
                {
                    "value": "chapters.chapter",
                    "selected": "true",
                    "name": "Chapters"
                },
            ]
        )

    # With query

    def test_search_view_all_items(self):
        self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter(2)
        self.chapters_test_data.create_chapter(3)
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        get_parameters = [("q", "")]
        url += query_string(get_parameters)
        response = self.client.get(url)
        self.assertEqual(len(response.context["object_list"]), 0)

    def test_search_view_assert_order(self):
        chapter = self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter_section(chapter, 1)
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        get_parameters = [
            ("q", ""),
            ("models", "chapters.chapter"),
            ("models", "chapters.chaptersection"),
        ]
        url += query_string(get_parameters)
        response = self.client.get(url)
        result_objects = response.context["object_list"]
        self.assertEqual(result_objects[0].model_name, "chapter")
        self.assertEqual(result_objects[1].model_name, "chaptersection")

    def test_search_view_model_filter(self):
        chapter = self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter_section(chapter, 1)
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        get_parameters = [
            ("models", "chapters.chapter"),
            ("q", "chapter"),
        ]
        url += query_string(get_parameters)
        response = self.client.get(url)
        result_objects = response.context["object_list"]
        self.assertEqual(len(result_objects), 1)
        self.assertEqual(result_objects[0].model_name, "chapter")

    def test_search_view_model_filter_multiple(self):
        chapter = self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter_section(chapter, 1)
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        get_parameters = [
            ("q", ""),
            ("models", "chapters.chapter"),
            ("models", "chapters.chaptersection"),
        ]
        url += query_string(get_parameters)
        response = self.client.get(url)
        result_objects = response.context["object_list"]
        self.assertEqual(len(result_objects), 2)
        self.assertEqual(result_objects[0].model_name, "chapter")
        self.assertEqual(result_objects[1].model_name, "chaptersection")

    def test_search_view_model_filter_multiple_with_query(self):
        chapter = self.chapters_test_data.create_chapter(1)
        self.chapters_test_data.create_chapter_section(chapter, 1)
        management.call_command("rebuild_index", "--noinput")
        url = reverse("search:index")
        get_parameters = [
            ("q", "Chapter"),
            ("models", "chapters.chapter"),
            ("models", "chapters.chaptersection"),
        ]
        url += query_string(get_parameters)
        response = self.client.get(url)
        result_objects = response.context["object_list"]
        self.assertEqual(len(result_objects), 1)
        self.assertEqual(result_objects[0].model_name, "chapter")
