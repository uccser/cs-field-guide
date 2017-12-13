from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.models import Chapter
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

    def test_loading_single_chapter(self):
        """Tests that chapter loader can load single chapter.
        """
        config_file = "basic-config.yaml"  # placeholder, required parameter for error raised in chapter loader
        chapter_slug = "chapter-1"
        chapter_structure = {"number": 1}

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

    def test_missing_chapter_number(self):
        """Tests MissingRequiredFieldError raised when chapter number not specified.
        """
        config_file = "basic-config.yaml"
        chapter_slug = "chapter-1"
        chapter_structure = {}

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

    def test_missing_heading(self):
        """
        """
        pass

    def test_title_empty_content(self):
        """Tests EmptyMarkdownFileError raised when no content in file.
        """
        config_file = "basic-config.yaml"
        chapter_slug = "missing-content"
        chapter_structure = {"number": 1}

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

    def tests_empty_file(self):
        """Tests NoHeadingFoundInMarkdownFileError raised when markdown file is empty.
        """
        config_file = "basic-config.yaml"
        chapter_slug = "empty-file"
        chapter_structure = {"number": 1}

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

    def test_missing_markdown_file(self):
        """Tests CouldNotFindMarkdownFileError raised when markdown file matching slug does not exist.
        """
        config_file = "basic-config.yaml"
        chapter_slug = "this-file-does-not-exist"
        chapter_structure = {"number": 1}

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
