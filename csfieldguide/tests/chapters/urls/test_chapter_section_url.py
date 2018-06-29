from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class ChapterSectionURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_chapter_section_valid_url(self):
        chapter = self.test_data.create_chapter("1")
        self.test_data.create_chapter_section(chapter, "1")
        kwargs = {
            "chapter_slug": "chapter-1",
            "chapter_section_slug": "section-1"
        }
        url = reverse("chapters:chapter_section", kwargs=kwargs)
        self.assertEqual(url, "/en/chapters/chapter-1/section-1/")
