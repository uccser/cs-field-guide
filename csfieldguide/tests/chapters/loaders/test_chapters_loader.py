from unittest.mock import Mock

from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator

from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.models import Chapter

from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


class ChapterLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "chapters"
        self.base_path = self.test_data.LOADER_ASSET_PATH
        self.factory = Mock()
        self.config_file = "basic-config.yaml"  # placeholder, required parameter for error raised in chapter loader

    def test_chapters_chapter_loader_single_chapter(self):
        chapter_slug = "chapter-1"
        chapter_structure = {
            "chapter-number": 1,
            "title": "Chapter 1",
            "sections": {
                "introduction-for-teachers": {
                    "section-number": 1
                }
            }
        }

        chapter_loader = ChapterLoader(
            factory=self.factory,
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        chapter_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_chapter_loader_multiple_chapters(self):
        chapter_1_slug = "chapter-1"
        chapter_1_structure = {
            "chapter-number": 1,
            "title": "Chapter 1",
            "sections": {
                "introduction-for-teachers": {
                    "section-number": 1
                }
            }
        }
        chapter_loader = ChapterLoader(
            factory=self.factory,
            structure_file_path=self.config_file,
            chapter_slug=chapter_1_slug,
            chapter_structure=chapter_1_structure,
            BASE_PATH=self.base_path
        )
        chapter_loader.load()

        chapter_2_slug = "chapter-2"
        chapter_2_structure = {
            "chapter-number": 2,
            "title": "Chapter 2",
            "sections": {
                "introduction-for-teachers": {
                    "section-number": 1
                }
            }
        }
        chapter_loader = ChapterLoader(
            factory=self.factory,
            structure_file_path=self.config_file,
            chapter_slug=chapter_2_slug,
            chapter_structure=chapter_2_structure,
            BASE_PATH=self.base_path
        )
        chapter_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            [
                "<Chapter: Chapter 1>",
                "<Chapter: Chapter 2>"
            ]
        )

    def test_chapters_chapter_loader_missing_chapter_number(self):
        chapter_slug = "chapter-1"
        chapter_structure = {
            "title": "Chapter 1",
            "sections": {
                "introduction-for-teachers": {
                    "section-number": 1
                }
            }
        }

        chapter_loader = ChapterLoader(
            factory=self.factory,
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_missing_title(self):
        chapter_slug = "missing-title"
        chapter_structure = {
            "chapter-number": 1,
            "sections": {
                "introduction-for-teachers": {
                    "section-number": 1
                }
            }
        }

        chapter_loader = ChapterLoader(
            factory=self.factory,
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            MissingRequiredFieldError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_title_missing_sections(self):
        chapter_slug = "missing-sections"
        chapter_structure = {
            "chapter-number": 1,
            "title": "Chapter 1",
        }

        chapter_loader = ChapterLoader(
            factory=self.factory,
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            MissingRequiredFieldError,
            chapter_loader.load
        )
