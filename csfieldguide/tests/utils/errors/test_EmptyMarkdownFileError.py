"""Test class for EmptyMarkdownFileError error."""

from django.test import SimpleTestCase
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError


class EmptyMarkdownFileErrorTest(SimpleTestCase):
    """Test class for EmptyMarkdownFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = EmptyMarkdownFileError("md file path")
        self.assertEqual(exception.md_file_path, "md file path")

    def test_string(self):
        exception = EmptyMarkdownFileError("md file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n\n"
            "The file contains no content.\n\n"
            "Note: A file containing a title and no other content is\n"
            "also considered to be empty.\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
