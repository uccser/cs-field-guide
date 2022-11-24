import os.path
from unittest import mock
from django.core.exceptions import ValidationError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.management.commands._ChapterSectionHeadingsLoader import ChapterSectionHeadingsLoader
from chapters.models import Chapter, ChapterSection, ChapterSectionHeading
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from utils.errors.KeyNotFoundError import KeyNotFoundError


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
            ["<ChapterSectionHeading: This is a second level heading>"]
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
            ]
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
            ]
        )

        ## Now add the new heading while the previous one is in the database
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
            ]
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
            ]
        )

        ## Now add the new heading while the previous one is in the database
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
                "<ChapterSectionHeading: This heading was added in the middle"
                "<ChapterSectionHeading: This is another second level heading>"
            ]
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
            ]
        )

        ## Now add the new heading while the previous one is in the database
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
            ]
        )
        

    # def test_chapters_chapter_section_loader_multiple_sections(self):
    #     test_slug = "multiple-sections"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     chapter_section_loader.load()
    #     self.assertQuerysetEqual(
    #         ChapterSection.objects.all(),
    #         [
    #             "<ChapterSection: This is the first section>",
    #             "<ChapterSection: This is the second section>"
    #         ]
    #     )

    # def test_chapters_chapter_section_loader_missing_section_data(self):
    #     test_slug = "missing-section-data"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         MissingRequiredFieldError,
    #         chapter_section_loader.load
    #     )

    # def test_chapters_chapter_section_loader_missing_section_number(self):
    #     test_slug = "missing-section-number"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         MissingRequiredFieldError,
    #         chapter_section_loader.load
    #     )

    # def test_chapters_chapter_section_loader_invalid_section_number(self):
    #     test_slug = "invalid-section-number"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         InvalidYAMLValueError,
    #         chapter_section_loader.load
    #     )

    # def test_chapters_chapter_section_loader_duplicate_section_numbers(self):
    #     test_slug = "duplicate-section-numbers"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         ValidationError,
    #         chapter_section_loader.load
    #     )

    # def test_chapters_chapter_section_loader_missing_name(self):
    #     test_slug = "missing-name"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         NoHeadingFoundInMarkdownFileError,
    #         chapter_section_loader.load
    #     )

    # def test_chapters_chapter_section_loader_interactive(self):
    #     test_slug = "interactives"
    #     chapter = self.test_data.create_chapter("1")
    #     interactive1 = self.interactives_test_data.create_interactive(1)
    #     interactive2 = self.interactives_test_data.create_interactive(2)
    #     interactive3 = self.interactives_test_data.create_interactive(3)
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     chapter_section_loader.load()
    #     self.assertQuerysetEqual(
    #         ChapterSection.objects.all(),
    #         ["<ChapterSection: Interactives>"]
    #     )
    #     self.assertEqual(
    #         list(Chapter.objects.get(slug=chapter.slug).interactives.order_by("slug")),
    #         [
    #             interactive1,
    #             interactive2,
    #             interactive3,
    #         ]
    #     )

    # def test_chapters_chapter_section_loader_interactive_invalid(self):
    #     test_slug = "invalid-interactive"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         KeyNotFoundError,
    #         chapter_section_loader.load
    #     )

    # def test_chapters_chapter_section_loader_non_sequential_section_number(self):
    #     test_slug = "non-sequential-section-numbers"
    #     chapter = self.test_data.create_chapter("1")
    #     factory = mock.Mock()
    #     chapter_section_loader = ChapterSectionsLoader(
    #         factory,
    #         chapter,
    #         base_path=self.base_path,
    #         content_path=test_slug,
    #         structure_filename="{}.yaml".format(test_slug),
    #     )
    #     self.assertRaises(
    #         InvalidYAMLValueError,
    #         chapter_section_loader.load
    #     )
