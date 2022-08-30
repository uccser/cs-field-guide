"""Test class for VertoConversionError error."""

from django.test import SimpleTestCase
from verto.errors.ArgumentMissingError import ArgumentMissingError
from verto.errors.StyleError import StyleError
from utils.errors.VertoConversionError import VertoConversionError


class VertoConversionErrorTest(SimpleTestCase):
    """Test class for VertoConversionError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        verto_error = ArgumentMissingError("tag-name", "argument-name", "argument-name is a required argument.")
        exception = VertoConversionError("md file path", verto_error)
        self.assertEqual(exception.markdown_path, "md file path")
        self.assertEqual(exception.verto_error, verto_error)

    def test_string_no_code(self):
        verto_error = ArgumentMissingError("tag-name", "argument-name", "argument-name is a required argument.")
        exception = VertoConversionError("md file path", verto_error)
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n\n"
            "Conversion failed with error: \"argument-name is a required argument.\"\n"
        )
        self.assertEqual(exception.__str__(), expected_string)

    def test_string_code(self):
        verto_error = StyleError(
            [15, 16, 17],
            ["", "{panel type=\"teacher-note\"}", "# Chatterbots in the classroom"],
            "Blocks must be separated by whitespace."
        )
        exception = VertoConversionError("md file path", verto_error)
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: md file path\n\n"
            "Conversion failed with error: \"Blocks must be separated by whitespace.\"\n"
            "15    \n"
            "16    {panel type=\"teacher-note\"}\n"
            "17    # Chatterbots in the classroom\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
