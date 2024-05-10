import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.models import Chapter, ChapterSection
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from utils.errors.KeyNotFoundError import KeyNotFoundError


class ChapterSectionsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.interactives_test_data = InteractivesTestDataGenerator()
        self.loader_name = "chapter-sections"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)

    def test_chapters_chapter_section_loader_single_section(self):
        test_slug = "single-section"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            ["<ChapterSection: This is the section heading>"],
            transform=repr
        )

    def test_chapters_chapter_section_loader_single_section_with_slug(self):
        test_slug = "single-section-slug"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        querryset = ChapterSection.objects.all()
        self.assertQuerysetEqual(
            querryset,
            ["<ChapterSection: This is the section heading>"],
            transform=repr
        )
        self.assertEqual(querryset[0].slug, 'new-slug')

    def test_chapters_chapter_section_loader_single_section_with_invalid_slug(self):
        test_slug = "single-section-invalid-slug"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_multiple_sections_with_duplicate_slug(self):
        test_slug = "multiple-sections-duplicate-slug"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_multiple_sections(self):
        test_slug = "multiple-sections"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the second section>"
            ],
            transform=repr
        )

    def test_chapters_chapter_section_loader_missing_section_data(self):
        test_slug = "missing-section-data"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_missing_section_number(self):
        test_slug = "missing-section-number"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_invalid_section_number(self):
        test_slug = "invalid-section-number"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_duplicate_section_numbers(self):
        test_slug = "duplicate-section-numbers"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_missing_name(self):
        test_slug = "missing-name"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_interactive(self):
        test_slug = "interactives"
        chapter = self.test_data.create_chapter("1")
        interactive1 = self.interactives_test_data.create_interactive(1)
        interactive2 = self.interactives_test_data.create_interactive(2)
        interactive3 = self.interactives_test_data.create_interactive(3)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            ["<ChapterSection: Interactives>"],
            transform=repr
        )
        self.assertEqual(
            list(Chapter.objects.get(slug=chapter.slug).interactives.order_by("slug")),
            [
                interactive1,
                interactive2,
                interactive3,
            ],
        )

    def test_chapters_chapter_section_loader_interactive_invalid(self):
        test_slug = "invalid-interactive"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            KeyNotFoundError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_non_sequential_section_number(self):
        test_slug = "non-sequential-section-numbers"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_added_section(self):
        test_slug = "single-section"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            ["<ChapterSection: This is the section heading>"],
            transform=repr
        )

        # Now add the section once the previous one is in the database
        test_slug = "added-section"
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the section heading>",
                "<ChapterSection: This is the added section heading>"
            ],
            transform=repr
        )

    def test_chapters_chapter_section_loader_insert_middle_section(self):
        test_slug = "multiple-sections"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the second section>"
            ],
            transform=repr
        )

        # Now add the section to the middle now that the previous
        # ones are in the database
        test_slug = "middle-section"
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the middle section heading>",
                "<ChapterSection: This is the second section>"
            ],
            transform=repr
        )

    def test_chapters_chapter_section_loader_delete_middle_section(self):
        test_slug = "middle-section"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the middle section heading>",
                "<ChapterSection: This is the second section>"
            ],
            transform=repr
        )

        # Delete the middle section from the database
        test_slug = "multiple-sections"
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the second section>"
            ],
            transform=repr
        )
