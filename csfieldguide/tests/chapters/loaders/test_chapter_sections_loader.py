import os.path
from unittest.mock import Mock

from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator

from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.models import Chapter

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
        self.config_file = "basic-config.yaml"  # placeholder, required parameter for error raised in chapter loader

    def test_chapters_chapter_section_loader_single_section(self):
        chapter = self.test_data.create_chapter("1")
        section_slug = "single-section"
        section_structure = {
            "section-number": 1
        }

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_slug,
            section_structure=section_structure,
            BASE_PATH=self.base_path
        )
        chapter_section_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_chapter_section_loader_multiple_sections(self):
        chapter = self.test_data.create_chapter("1")
        section_1_slug = "multiple-sections-section-1"
        section_1_structure = {
            "section-number": 1
        }

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_1_slug,
            section_structure=section_1_structure,
            BASE_PATH=self.base_path
        )

        chapter_section_loader.load()
        section_2_slug = "multiple-sections-section-2"
        section_2_structure = {
            "section-number": 2
        }

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_2_slug,
            section_structure=section_2_structure,
            BASE_PATH=self.base_path
        )
        chapter_section_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_chapter_section_loader_missing_section_number(self):
        chapter = self.test_data.create_chapter("1")
        section_slug = "single-section"
        section_structure = {}

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_slug,
            section_structure=section_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            MissingRequiredFieldError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_duplicate_section_numbers(self):
        pass

    def test_chapters_chapter_section_loader_missing_heading(self):
        chapter = self.test_data.create_chapter("1")
        section_slug = "missing-heading"
        section_structure = {
            "section-number": 1
        }

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_slug,
            section_structure=section_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_empty_file(self):
        chapter = self.test_data.create_chapter("1")
        section_slug = "empty-file"
        section_structure = {
            "section-number": 1
        }

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_slug,
            section_structure=section_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_missing_markdown_file(self):
        chapter = self.test_data.create_chapter("1")
        section_slug = "this-file-does-not-exist"
        section_structure = {
            "section-number": 1
        }

        chapter_section_loader = ChapterSectionsLoader(
            structure_file_path=self.config_file,
            chapter=chapter,
            section_slug=section_slug,
            section_structure=section_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            CouldNotFindMarkdownFileError,
            chapter_section_loader.load
        )
