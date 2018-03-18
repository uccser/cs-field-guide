from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class IndexViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.chapters_test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_interactives_index_view_with_zero_interactive(self):
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 0)

    def test_interactives_index_view_with_one_interactive(self):
        self.test_data.create_interactive(1)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 1)

    def test_interactives_index_view_with_multiple_interactives(self):
        self.test_data.create_interactive(1)
        self.test_data.create_interactive(2)
        self.test_data.create_interactive(3)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 3)

    def test_interactives_index_view_with_zero_chapters(self):
        self.test_data.create_interactive(1)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["chapters"]), 0)

    def test_interactives_index_view_chapter_with_one_interactive(self):
        chapter = self.chapters_test_data.create_chapter(1)
        interactive = self.test_data.create_interactive(1)
        chapter.interactives.add(interactive)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 1)
        response_chapters = response.context["chapters"]
        self.assertEqual(len(response_chapters), 1)
        self.assertQuerysetEqual(
            response_chapters.get(slug="chapter-1").interactives.all(),
            ["<Interactive: Interactive 1>"],
        )

    def test_interactives_index_view_chapter_with_multiple_interactives(self):
        chapter = self.chapters_test_data.create_chapter(1)
        interactive1 = self.test_data.create_interactive(1)
        interactive2 = self.test_data.create_interactive(2)
        interactive3 = self.test_data.create_interactive(3)
        chapter.interactives.add(interactive1)
        chapter.interactives.add(interactive2)
        chapter.interactives.add(interactive3)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 3)
        response_chapters = response.context["chapters"]
        self.assertEqual(len(response_chapters), 1)
        self.assertQuerysetEqual(
            response_chapters.get(slug="chapter-1").interactives.all(),
            [
                "<Interactive: Interactive 1>",
                "<Interactive: Interactive 2>",
                "<Interactive: Interactive 3>",
            ],
        )

    def test_interactives_index_view_multiple_chapters_with_multiple_interactives(self):
        chapter1 = self.chapters_test_data.create_chapter(1)
        interactive1 = self.test_data.create_interactive(1)
        interactive2 = self.test_data.create_interactive(2)
        interactive3 = self.test_data.create_interactive(3)
        chapter1.interactives.add(interactive1)
        chapter1.interactives.add(interactive2)
        chapter1.interactives.add(interactive3)
        chapter2 = self.chapters_test_data.create_chapter(2)
        interactive4 = self.test_data.create_interactive(4)
        interactive5 = self.test_data.create_interactive(5)
        chapter2.interactives.add(interactive4)
        chapter2.interactives.add(interactive5)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 5)
        response_chapters = response.context["chapters"]
        self.assertEqual(len(response_chapters), 2)
        self.assertQuerysetEqual(
            response_chapters.get(slug="chapter-1").interactives.all(),
            [
                "<Interactive: Interactive 1>",
                "<Interactive: Interactive 2>",
                "<Interactive: Interactive 3>",
            ],
        )
        self.assertQuerysetEqual(
            response_chapters.get(slug="chapter-2").interactives.all(),
            [
                "<Interactive: Interactive 4>",
                "<Interactive: Interactive 5>",
            ],
        )
