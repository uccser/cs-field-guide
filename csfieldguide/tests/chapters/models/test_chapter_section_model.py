from tests.BaseTestWithDB import BaseTestWithDB

from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.models import ChapterSection


class ChapterSectionModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()

    def test_chapters_chapter_section_model_str(self):
        chapter = self.test_data.create_chapter("1")
        section = ChapterSection.objects.create(
            slug="the-first-section",
            name="The First Section",
            number=1,
            content="<p>Some content for the first section</p>.",
            chapter=chapter
        )
        self.assertEqual(
            section.__str__(),
            "The First Section"
        )

    def test_chapters_chapter_section_model_one_section(self):
        chapter = self.test_data.create_chapter("1")
        ChapterSection.objects.create(
            slug="section-1",
            name="Section 1",
            number=1,
            content="<p>Some content for section 1</p>.",
            chapter=chapter
        )
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: Section 1>",
            ],
        )

    def test_chapters_chapter_section_model_two_chapters(self):
        chapter = self.test_data.create_chapter("1")
        ChapterSection.objects.create(
            slug="section-1",
            name="Section 1",
            number=1,
            content="<p>Some content for the first section</p>.",
            chapter=chapter
        )
        ChapterSection.objects.create(
            slug="section-2",
            name="Section 2",
            number=2,
            content="<p>Some content for the second section</p>.",
            chapter=chapter
        )
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: Section 1>",
                "<ChapterSection: Section 2>"
            ],
        )
