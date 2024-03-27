import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.management.commands._ChapterSectionHeadingsLoader import ChapterSectionHeadingsLoader
from chapters.models import ChapterSection, ChapterSectionHeading


class ChapterSectionHeadingsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "chapter-sections"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)

    def test_chapters_chapter_section_loader_single_heading(self):
        test_slug = "multiple-sections"
        section_slug = "multiple-sections-section-1"
        chapter = self.test_data.create_chapter(1)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            ["<ChapterSectionHeading: This is a second level heading>"],
            transform=repr
        )

    def test_chapters_chapter_section_loader_multiple_headings(self):
        test_slug = "multiple-sections"
        section_slug = "multiple-sections-section-2"
        chapter = self.test_data.create_chapter(1)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
                "<ChapterSectionHeading: This is another second level heading>"
            ],
            transform=repr
        )

    def test_chapters_chapter_section_loader_added_heading(self):
        test_slug = "multiple-sections"
        section_slug = "multiple-sections-section-1"
        chapter = self.test_data.create_chapter(1)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
            ],
            transform=repr
        )

        # Now add the new heading while the previous one is in the database
        section_slug = "multiple-sections-section-2"
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
                "<ChapterSectionHeading: This is another second level heading>"
            ],
            transform=repr
        )

    def test_chapters_chapter_section_loader_added_middle(self):
        test_slug = "multiple-sections"
        section_slug = "multiple-sections-section-2"
        chapter = self.test_data.create_chapter(1)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
                "<ChapterSectionHeading: This is another second level heading>"
            ],
            transform=repr
        )

        # Now add the new heading while the previous one is in the database
        test_slug = "add-heading-middle"
        section_slug = "add-heading-middle"
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
                "<ChapterSectionHeading: This heading was added in the middle>",
                "<ChapterSectionHeading: This is another second level heading>"
            ],
            transform=repr
        )

    def test_chapters_chapter_section_removed_heading(self):
        test_slug = "multiple-sections"
        section_slug = "multiple-sections-section-2"
        chapter = self.test_data.create_chapter(1)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
                "<ChapterSectionHeading: This is another second level heading>"
            ],
            transform=repr
        )

        # Now add the new heading while the previous one is in the database
        section_slug = "multiple-sections-section-1"
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        content_translations = chapter_section_loader.get_markdown_translations(
            "{}.md".format(section_slug)
        )
        chapter_section_heading_loader = ChapterSectionHeadingsLoader(
            factory,
            ChapterSection.objects.first(),
            content_translations,
            base_path=self.base_path,
        )
        chapter_section_heading_loader.load()
        self.assertQuerysetEqual(
            ChapterSectionHeading.objects.all(),
            [
                "<ChapterSectionHeading: This is a second level heading>",
            ],
            transform=repr
        )
