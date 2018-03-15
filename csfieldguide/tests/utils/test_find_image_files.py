"""Test class for find_image_files in check_required_files_module."""


from django.test import SimpleTestCase
from utils import check_required_files
from utils.errors.CouldNotFindImageError import CouldNotFindImageError


class FindImageFilesTest(SimpleTestCase):
    """Test class for find_image_files in check_required_files module."""

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
