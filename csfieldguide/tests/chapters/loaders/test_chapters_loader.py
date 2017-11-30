from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.models import Chapter


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

        chapter_loader = ChapterLoader(
            structure_file_path=config_file,
            chapter_slug=chapter_slug,
            BASE_PATH=self.base_path
        )
        chapter_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )

    def test_missing_title(self):
        """
        """
        pass

    def test_title_empty_content(self):
        """
        """
        pass

    def tests_empty_file(self):
        """
        """
        pass

    def test_missing_markdown_file(self):
        """
        """
        pass
