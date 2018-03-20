"""Test class for MarkdownStyleError error."""

from django.test import SimpleTestCase
from utils.errors.MarkdownStyleError import MarkdownStyleError
from unittest.mock import Mock


class MarkdownStyleErrorTest(SimpleTestCase):
    """Test class for MarkdownStyleError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        style_error = Mock()
        style_error.message = "Message."
        style_error.line_nums = (2, 3, 4)
        style_error.lines = ("", "{panel}", "Panel contents")
        exception = MarkdownStyleError("md file path", style_error)
        self.assertEqual(exception.markdown_path, "md file path")
        self.assertEqual(exception.message, "Message.")
        self.assertEqual(exception.line_nums, (2, 3, 4))
        self.assertEqual(exception.lines, ("", "{panel}", "Panel contents"))

    def test_string(self):
        style_error = Mock()
        style_error.message = "Message."
        style_error.line_nums = (2, 3, 4)
        style_error.lines = ("", "{panel}", "Panel contents")
        exception = MarkdownStyleError("md file path", style_error)
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n\n"
            "Conversion of file md file path failed with error: \"Message.\"\n"
            "2     \n"
            "3     {panel}\n"
            "4     Panel contents\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
