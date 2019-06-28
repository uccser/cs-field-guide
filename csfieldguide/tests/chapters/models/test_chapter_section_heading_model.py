from tests.BaseTestWithDB import BaseTestWithDB

from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.models import ChapterSectionHeading


class ChapterSectionHeadingModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()

    def test_chapters_chapter_section_heading_model_str(self):
        chapter = self.test_data.create_chapter(1)
        section = self.test_data.create_chapter_section(chapter, 1)
        heading = ChapterSectionHeading(
            slug="heading-1",
            name="Heading 1",
            language="en",
            number=1,
            chapter_section=section,
        )
        self.assertEqual(
            heading.__str__(),
            "Heading 1"
        )

    def test_chapters_chapter_section_heading_model_absolute_url(self):
        chapter = self.test_data.create_chapter(1)
        section = self.test_data.create_chapter_section(chapter, 1)
        heading = ChapterSectionHeading(
            slug="heading-1",
            name="Heading 1",
            language="en",
            number=1,
            chapter_section=section,
        )
        self.assertEqual(
            heading.get_absolute_url(),
            "/en/chapters/chapter-1/section-1/#heading-1"
        )

    def test_chapters_chapter_section_heading_model_default_order(self):
        chapter = self.test_data.create_chapter(1)
        section = self.test_data.create_chapter_section(chapter, 1)
        # Create in reverse order
        ChapterSectionHeading(
            slug="heading-2",
            name="Heading 2",
            language="en",
            number=2,
            chapter_section=section,
        ).save()
        ChapterSectionHeading(
            slug="heading-1",
            name="Heading 1",
            language="en",
            number=1,
            chapter_section=section,
        ).save()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: Heading 1>",
                "<ChapterSectionHeading: Heading 2>"
            ],
        )
