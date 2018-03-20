"""Test class for KeyNotFoundError error."""

from django.test import SimpleTestCase
from utils.errors.KeyNotFoundError import KeyNotFoundError


class KeyNotFoundErrorTest(SimpleTestCase):
    """Test class for KeyNotFoundError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = KeyNotFoundError("config file path", "key", "field")
        self.assertEqual(exception.config_file_path, "config file path")
        self.assertEqual(exception.key, "key")
        self.assertEqual(exception.field, "field")

    def test_string(self):
        exception = KeyNotFoundError("config file path", "key", "field")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: config file path\n\n"
            "Key: key\n"
            '"key" did not match any field\n\n'
            "Options:\n"
            "  - Did you spell the name of the key correctly?\n"
            "  - Does the key exist?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
