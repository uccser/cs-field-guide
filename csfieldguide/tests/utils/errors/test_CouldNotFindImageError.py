"""Test class for CouldNotFindImageError error."""

from django.test import SimpleTestCase
from utils.errors.CouldNotFindImageError import CouldNotFindImageError


class CouldNotFindImageErrorTest(SimpleTestCase):
    """Test class for CouldNotFindImageError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = CouldNotFindImageError("image path", "reference file path")
        self.assertEqual(exception.image_path, "image path")
        self.assertEqual(exception.reference_file_path, "reference file path")

    def test_string(self):
        exception = CouldNotFindImageError("image path", "reference file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: image path\n"
            "Referenced in: reference file path\n\n"
            "Could not find image.\n\n"
            "  - Did you spell the name of the file correctly?\n"
            "  - Does the file exist?\n"
            "  - Is the file saved in the correct directory?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
