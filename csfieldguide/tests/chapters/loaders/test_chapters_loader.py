from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator

from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.models import Chapter

from utils.errors.KeyNotFoundError import KeyNotFoundError
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError


class ChaptersLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.test_interactive_data = InteractivesTestDataGenerator()
        self.loader_name = "chapters"
        self.config_file = "basic-config.yaml"  # placeholder, required parameter for error raised in chapter loader
        self.base_path = self.test_data.LOADER_ASSET_PATH

    def test_chapters_chapters_loader_single_chapter(self):
        chapter_slug = "chapter-1"
        chapter_structure = {"number": 1, "icon": "legitimage.png"}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        chapters_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_chapters_loader_missing_chapter_number(self):
        chapter_slug = "chapter-1"
        chapter_structure = {"icon": "image.png"}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapters_loader.load
        )

    def test_chapters_chapters_loader_missing_chapter_icon(self):
        chapter_slug = "chapter-1"
        chapter_structure = {"number": 1}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapters_loader.load
        )

    def test_chapters_chapters_loader_chapter_with_interactive(self):
        chapter_slug = "chapter-with-interactive"
        chapter_structure = {
            "number": 1,
            "icon": "image.png",
        }
        self.test_interactive_data.create_interactive(1)

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        chapters_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_chapters_chapters_loader_chapter_with_incorrect_interactive_slug(self):
        chapter_slug = "chapter-with-incorrect-interactive-slug"
        chapter_structure = {
            "number": 1,
            "icon": "image.png",
        }
        self.test_interactive_data.create_interactive(1)

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            KeyNotFoundError,
            chapters_loader.load
        )

    def test_missing_heading(self):
        chapter_slug = "missing-heading"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapters_loader.load
        )

    def test_chapters_chapters_loader_title_empty_content(self):
        chapter_slug = "missing-content"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            EmptyMarkdownFileError,
            chapters_loader.load
        )

    def test_chapters_chapters_loader_empty_file(self):
        chapter_slug = "empty-file"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapters_loader.load
        )

    def test_chapters_chapters_loader_missing_markdown_file(self):
        chapter_slug = "this-file-does-not-exist"
        chapter_structure = {"number": 1, "icon": "image.png"}

        chapters_loader = ChapterLoader(
            structure_file_path=self.config_file,
            chapter_slug=chapter_slug,
            chapter_structure=chapter_structure,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            CouldNotFindMarkdownFileError,
            chapters_loader.load
        )
