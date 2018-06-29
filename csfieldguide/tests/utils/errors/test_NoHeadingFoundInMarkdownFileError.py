"""Test class for NoHeadingFoundInMarkdownFileError error."""

from django.test import SimpleTestCase
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError


class NoHeadingFoundInMarkdownFileErrorTest(SimpleTestCase):
    """Test class for NoHeadingFoundInMarkdownFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = NoHeadingFoundInMarkdownFileError("md file path")
        self.assertEqual(exception.md_file_path, "md file path")

    def test_string(self):
        exception = NoHeadingFoundInMarkdownFileError("md file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n\n"
            "The file does not contain a heading.\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
