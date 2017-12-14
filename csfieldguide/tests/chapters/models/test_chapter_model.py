from tests.BaseTestWithDB import BaseTestWithDB
from chapters.models import Chapter


class ChapterModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_chapters_chapter_model_one_chapter(self):
        new_chapter_term = Chapter.objects.create(
            slug="chapter-1",
            name="Chapter 1",
            content="This is the content for chapter 1."
        )
        query_result = Chapter.objects.get(slug="chapter-1")
        self.assertEqual(query_result, new_chapter_term)

    def test_chapters_chapter_model_two_chapters(self):
        Chapter.objects.create(
            slug="chapter-1",
            name="Chapter 1",
            content="This is the content for chapter 1."
        )
        Chapter.objects.create(
            slug="chapter-2",
            name="Chapter 2",
            content="This is the content for chapter 2."
        )
        self.assertQuerysetEqual(
            Chapter.objects.all(),
            [
                "<Chapter: Chapter 1>",
                "<Chapter: Chapter 2>"
            ],
            ordered=False
        )
