from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator

from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.models import Chapter

from utils.errors.KeyNotFoundError import KeyNotFoundError
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError


class ChapterLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "chapters"
        self.base_path = self.test_data.LOADER_ASSET_PATH

    def test_chapters_chapter_loader_single_chapter(self):
        config_file = "basic-config.yaml"  # placeholder, required parameter for error raised in chapter loader
        chapter_slug = "chapter-1"
        chapter_structure = {"number": 1, "icon": "legitimage.png"}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        chapter_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_chapter_loader_missing_chapter_number(self):
        config_file = "basic-config.yaml"
        chapter_slug = "chapter-1"
        chapter_structure = {"icon": "image.png"}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_missing_chapter_icon(self):
        config_file = "basic-config.yaml"
        chapter_slug = "chapter-1"
        chapter_structure = {"number": 1}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_incorrect_interactive_slug(self):
        config_file = "basic-config.yaml"
        chapter_slug = "chapter-1"
        chapter_structure = {
            "number": 1,
            "icon": "image.png",
            "interactives": ["does-not-exist"]
        }

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            KeyNotFoundError,
            chapter_loader.load
        )

    def test_missing_heading(self):
        config_file = "basic-config.yaml"
        chapter_slug = "missing-heading"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_title_empty_content(self):
        config_file = "basic-config.yaml"
        chapter_slug = "missing-content"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            EmptyMarkdownFileError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_empty_file(self):
        config_file = "basic-config.yaml"
        chapter_slug = "empty-file"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_loader.load
        )

    def test_chapters_chapter_loader_missing_markdown_file(self):
        config_file = "basic-config.yaml"
        chapter_slug = "this-file-does-not-exist"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            CouldNotFindMarkdownFileError,
            chapter_loader.load
        )
