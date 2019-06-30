"""Test class for InvalidYAMLValueError error."""

from django.test import SimpleTestCase
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError


class InvalidYAMLValueErrorTest(SimpleTestCase):
    """Test class for InvalidYAMLValueError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = InvalidYAMLValueError(
            "yaml file path",
            "key",
            "expected"
        )
        self.assertEqual(exception.yaml_file_path, "yaml file path")
        self.assertEqual(exception.key, "key")
        self.assertEqual(exception.expected, "expected")

    def test_string(self):
        exception = InvalidYAMLValueError(
            "yaml file path",
            "key",
            "expected"
        )
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: yaml file path\n\n"
            "Invalid configuration file value for: key\n\n"
            "Expected: expected\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
