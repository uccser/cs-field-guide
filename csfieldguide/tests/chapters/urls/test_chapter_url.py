from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class ChapterURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_chapters_valid_chapter_url(self):
        self.test_data.create_chapter("1")

        kwargs = {
            "chapter_slug": "chapter-1"
        }

        url = reverse("chapters:chapter", kwargs=kwargs)
        self.assertEqual(url, "/en/chapters/chapter-1/")
