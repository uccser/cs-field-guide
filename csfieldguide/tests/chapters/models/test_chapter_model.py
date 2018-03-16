from tests.BaseTestWithDB import BaseTestWithDB
from chapters.models import Chapter


class ChapterModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_chapters_chapter_model_str(self):
        chapter = Chapter.objects.create(
            slug="a-good-chapter",
            name="A Good Chapter",
            number=1
        )
        self.assertEqual(
            chapter.__str__(),
            "A Good Chapter"
        )

    def test_chapters_chapter_model_one_chapter(self):
        Chapter.objects.create(
            slug="chapter-1",
            name="Chapter 1",
            number=1,
        )
        self.assertQuerysetEqual(
            Chapter.objects.all(),
            [
                "<Chapter: Chapter 1>",
            ],
        )

    def test_chapters_chapter_model_two_chapters(self):
        Chapter.objects.create(
            slug="chapter-1",
            name="Chapter 1",
            number=1,
        )
        Chapter.objects.create(
            slug="chapter-2",
            name="Chapter 2",
            number=2,
            icon="image.png"
        )
        self.assertQuerysetEqual(
            Chapter.objects.all(),
            [
                "<Chapter: Chapter 1>",
                "<Chapter: Chapter 2>"
            ],
        )
