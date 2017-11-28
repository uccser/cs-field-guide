import os.path

from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._ChapterLoader import ChapterLoader


class ChapterLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "chapters"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, "chapters")

    def test_basic_chapter_loader_configuration(self):
        '''
        '''
        config_file = "basic-config.yaml"

        chapter = self.test_data.create_chapter("1")

        chapter_loader = ChapterLoader(
            chapter,
            structure_filename=config_file,
            base_path=self.base_path
        )
        chapter_loader.load()

        self.assertQuerysetEqual(
            Chapter.objects.all(),
            ["<Chapter: Chapter 1>"]
        )
