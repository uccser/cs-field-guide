from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class ChapterSectionViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_chapters_chapter_section_view_with_valid_slug(self):
        chapter = self.test_data.create_chapter("1")
        self.test_data.create_chapter_section(chapter, "1")

        kwargs = {
            "chapter_slug": "chapter-1",
            "chapter_section_slug": "section-1"
        }

        url = reverse("chapters:chapter_section", kwargs=kwargs)
        self.assertEqual(url, "/en/chapters/chapter-1/section-1/")

        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
