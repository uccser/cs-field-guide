"""Test class for MissingRequiredFieldError error."""

from django.test import SimpleTestCase
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


class MissingRequiredFieldErrorTest(SimpleTestCase):
    """Test class for MissingRequiredFieldError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = MissingRequiredFieldError(
            "config file path",
            ["field1", "field2"],
            "model"
        )
        self.assertEqual(exception.config_file_path, "config file path")
        self.assertEqual(exception.required_fields, ["field1", "field2"])
        self.assertEqual(exception.model, "model")

    def test_string_single_field(self):
        exception = MissingRequiredFieldError(
            "config file path",
            ["field1"],
            "model"
        )
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: config file path\n\n"
            "A model requires the following field:\n"
            "  - field1\n\n"
            "For the missing field:\n"
            "  - Is the field name spelt correctly?\n"
            "  - Does the field have the correct value?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)

    def test_string_multiple_fields(self):
        exception = MissingRequiredFieldError(
            "config file path",
            ["field1", "field2"],
            "model"
        )
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: config file path\n\n"
            "A model requires the following fields:\n"
            "  - field1\n"
            "  - field2\n\n"
            "For the missing fields:\n"
            "  - Is the field name spelt correctly?\n"
            "  - Does the field have the correct value?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
