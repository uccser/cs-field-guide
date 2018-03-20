"""Test class for EmptyYAMLFileError error."""

from django.test import SimpleTestCase
from utils.errors.EmptyYAMLFileError import EmptyYAMLFileError


class EmptyYAMLFileErrorTest(SimpleTestCase):
    """Test class for EmptyYAMLFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = EmptyYAMLFileError("yaml file path")
        self.assertEqual(exception.yaml_file_path, "yaml file path")

    def test_string(self):
        exception = EmptyYAMLFileError("yaml file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: yaml file path\n\n"
            "A YAML file cannot be empty.\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
