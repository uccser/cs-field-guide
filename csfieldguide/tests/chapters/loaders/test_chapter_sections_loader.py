import os.path
from django.core.exceptions import ValidationError
from unittest.mock import Mock
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.models import ChapterSection
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError


class ChapterSectionsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "chapter_section"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, "sections")
        self.factory = Mock()

    def test_chapters_chapter_section_loader_single_section(self):
        test_name = "single-section"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )
        chapter_section_loader.load()

        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            ["<ChapterSection: This is the section heading>"]
        )

    def test_chapters_chapter_section_loader_multiple_sections(self):
        test_name = "multiple-sections"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )
        chapter_section_loader.load()

        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the second section>"
            ]
        )

    def test_chapters_chapter_section_loader_missing_section_number(self):
        test_name = "missing-section-number"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )

        self.assertRaises(
            MissingRequiredFieldError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_duplicate_section_numbers(self):
        test_name = "duplicate-section-numbers"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )
        self.assertRaises(
            ValidationError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_missing_heading(self):
        test_name = "missing-heading"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )

        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_empty_file(self):
        test_name = "empty-file"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )

        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_missing_markdown_file(self):
        test_name = "missing-markdown-file"
        chapter = self.test_data.create_chapter("1")
        section_structure_file_path = os.path.join(
            self.base_path,
            "{}/{}.yaml".format(test_name, test_name)
        )
        chapter_path = os.path.join(
            self.base_path,
            test_name,
        )

        chapter_section_loader = ChapterSectionsLoader(
            chapter=chapter,
            chapter_path=chapter_path,
            section_structure_file_path=section_structure_file_path,
        )

        self.assertRaises(
            CouldNotFindMarkdownFileError,
            chapter_section_loader.load
        )
