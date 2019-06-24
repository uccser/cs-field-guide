"""Test class for DuplicateHeadingFoundInMarkdownFileError error."""

from django.test import SimpleTestCase
from utils.errors.DuplicateHeadingFoundInMarkdownFileError import DuplicateHeadingFoundInMarkdownFileError


class DuplicateHeadingFoundInMarkdownFileErrorTest(SimpleTestCase):
    """Test class for DuplicateHeadingFoundInMarkdownFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = DuplicateHeadingFoundInMarkdownFileError("md file path")
        self.assertEqual(exception.md_file_path, "md file path")

    def test_string(self):
        exception = DuplicateHeadingFoundInMarkdownFileError("md file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n"
            "The file contains more than one heading with the same text.\n\n"
            "To ensure heading permalinks on a page are unique, each title\n"
            "should have unique text.\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
