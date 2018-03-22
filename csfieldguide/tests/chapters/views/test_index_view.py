from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class IndexViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_chapters_index_view_with_one_chapter(self):
        chapter = self.test_data.create_chapter("1")
        self.test_data.create_chapter_section(chapter, "1")

        url = reverse("chapters:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["chapters"],
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_index_view_with_two_chapters(self):
        self.test_data.create_chapter("1")
        self.test_data.create_chapter("2")

        url = reverse("chapters:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["chapters"],
            [
                "<Chapter: Chapter 1>",
                "<Chapter: Chapter 2>"
            ]
        )

    def test_chapters_index_view_with_three_chapters(self):
        self.test_data.create_chapter("2")
        self.test_data.create_chapter("1")
        self.test_data.create_chapter("3")

        url = reverse("chapters:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["chapters"],
            [
                "<Chapter: Chapter 1>",
                "<Chapter: Chapter 2>",
                "<Chapter: Chapter 3>"
            ]
        )
