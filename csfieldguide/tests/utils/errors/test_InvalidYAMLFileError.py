"""Test class for InvalidYAMLFileError error."""

from django.test import SimpleTestCase
from utils.errors.InvalidYAMLFileError import InvalidYAMLFileError


class InvalidYAMLFileErrorTest(SimpleTestCase):
    """Test class for InvalidYAMLFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = InvalidYAMLFileError("yaml file path")
        self.assertEqual(exception.yaml_file_path, "yaml file path")

    def test_string(self):
        exception = InvalidYAMLFileError("yaml file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: yaml file path\n\n"
            "Invalid YAML file (.yaml).\n\n"
            "Options:\n"
            "  - Does the file match the expected layout?\n"
            "  - Does the file contain at least one key:value pair?\n"
            "  - Is the syntax correct? (are you missing a colon somewhere?)\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
