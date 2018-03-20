"""Test class for CouldNotFindMarkdownFileError error."""

from django.test import SimpleTestCase
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError


class CouldNotFindMarkdownFileErrorTest(SimpleTestCase):
    """Test class for CouldNotFindMarkdownFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = CouldNotFindMarkdownFileError("md file path", "config file path")
        self.assertEqual(exception.md_file_path, "md file path")
        self.assertEqual(exception.config_file_path, "config file path")

    def test_string(self):
        exception = CouldNotFindMarkdownFileError("md file path", "config file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n"
            "Referenced in: config file path\n\n"
            "Could not find Markdown file.\n\n"
            "  - Did you spell the name of the file correctly?\n"
            "  - Does the file exist?\n"
            "  - Is the file saved in the correct directory?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
