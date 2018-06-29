"""Test class for CouldNotFindYAMLFileError error."""

from django.test import SimpleTestCase
from utils.errors.CouldNotFindYAMLFileError import CouldNotFindYAMLFileError


class CouldNotFindYAMLFileErrorTest(SimpleTestCase):
    """Test class for CouldNotFindYAMLFileError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = CouldNotFindYAMLFileError("yaml file path")
        self.assertEqual(exception.yaml_file_path, "yaml file path")

    def test_string(self):
        exception = CouldNotFindYAMLFileError("yaml file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: yaml file path\n\n"
            "Could not find YAML file (.yaml).\n\n"
            "  - Did you spell the name of the file correctly?\n"
            "  - Does the file exist?\n"
            "  - Is the file saved in the correct directory?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
