"""Test class for MissingRequiredModelsError error."""

from django.test import SimpleTestCase
from utils.errors.MissingRequiredModelsError import MissingRequiredModelsError


class MissingRequiredModelsErrorTest(SimpleTestCase):
    """Test class for MissingRequiredModelsError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = MissingRequiredModelsError(
            "config file path",
            ["model1", "model2"]
        )
        self.assertEqual(exception.config_file_path, "config file path")
        self.assertEqual(exception.required_models, ["model1", "model2"])

    def test_string(self):
        exception = MissingRequiredModelsError(
            "config file path",
            ["model1", "model2"]
        )
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: config file path\n\n"
            "The following models are missing from the file:\n"
            "['model1', 'model2']\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
