from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from django.urls import reverse


class ChapterViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.language = "en"

    def test_chapter_view_with_valid_slug(self):
        chapter = self.test_data.create_chapter(1)
        kwargs = {
            "chapter_slug": chapter.slug,
        }
        url = reverse("chapters:chapter", kwargs=kwargs)
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(
            response.context["chapter"],
            chapter
        )

    def test_chapter_view_with_sections(self):
        chapter = self.test_data.create_chapter(1)
        self.test_data.create_chapter_section(chapter, 1)
        self.test_data.create_chapter_section(chapter, 2)
        self.test_data.create_chapter_section(chapter, 3)
        kwargs = {
            "chapter_slug": chapter.slug,
        }
        url = reverse("chapters:chapter", kwargs=kwargs)
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["chapter_sections"],
            [
                "<ChapterSection: Section 1>",
                "<ChapterSection: Section 2>",
                "<ChapterSection: Section 3>",
            ]
        )
