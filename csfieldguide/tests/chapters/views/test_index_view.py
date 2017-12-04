from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class IndexViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_index_with_one_chapter(self):
        """Tests view for index with one chapter.
        """
        self.test_data.create_chapter("1")

        url = reverse("chapters:home")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["all_chapters"],
            ["<Chapter: Chapter 1>"]
        )
