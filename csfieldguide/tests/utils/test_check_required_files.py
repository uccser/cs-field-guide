"""Test class for find_image_files in check_required_files_module."""

from utils import check_required_files
from utils.errors.CouldNotFindImageError import CouldNotFindImageError
from utils.errors.KeyNotFoundError import KeyNotFoundError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator


class CheckRequiredFilesTest(BaseTestWithDB):
    """Test class for find_image_files in check_required_files module."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chapters_test_data = ChaptersTestDataGenerator()
        self.interactives_test_data = InteractivesTestDataGenerator()

    def test_find_image_files_valid(self):
        images = {"img/logos/uc-computer-science-education-logo.png", "img/guide-favicon.png"}
        check_required_files.find_image_files(images, "md file path")

    def test_find_image_files_missing(self):
        images = {"img/logo.png", "img/invalid-image.jaypheg"}
        self.assertRaises(
            CouldNotFindImageError,
            check_required_files.find_image_files,
            images,
            "md file path"
        )

    def test_check_interactives_without_chapter(self):
        interactives = []
        interactives.append(self.interactives_test_data.create_interactive(1).slug)
        interactives.append(self.interactives_test_data.create_interactive(2).slug)
        interactives.append(self.interactives_test_data.create_interactive(3).slug)
        check_required_files.check_interactives(interactives, "file path")

    def test_check_interactives_with_chapter(self):
        interactives = []
        interactives.append(self.interactives_test_data.create_interactive(1).slug)
        interactives.append(self.interactives_test_data.create_interactive(2).slug)
        interactives.append(self.interactives_test_data.create_interactive(3).slug)
        chapter = self.chapters_test_data.create_chapter(1)
        check_required_files.check_interactives(interactives, "file path", chapter)
        self.assertQuerysetEqual(
            chapter.interactives.all(),
            [
                "<Interactive: Interactive 1>",
                "<Interactive: Interactive 2>",
                "<Interactive: Interactive 3>",
            ]
        )

    def test_check_interactives_invalid_interactive(self):
        interactives = ["invalid"]
        self.assertRaises(
            KeyNotFoundError,
            check_required_files.check_interactives,
            interactives,
            "file path",
        )
