"""Test class for CouldNotFindGlossaryTermError error."""

from django.test import SimpleTestCase
from utils.errors.CouldNotFindGlossaryTermError import CouldNotFindGlossaryTermError


class CouldNotFindGlossaryTermErrorTest(SimpleTestCase):
    """Test class for CouldNotFindGlossaryTermError error.

    Note: Tests to check if these were raised appropriately
          are located where this exception is used.
    """

    def test_attributes(self):
        exception = CouldNotFindGlossaryTermError("term", "file path")
        self.assertEqual(exception.term, "term")
        self.assertEqual(exception.reference_file_path, "file path")

    def test_string(self):
        exception = CouldNotFindGlossaryTermError("term", "file path")
        expected_string = (
            "\n****************************ERROR****************************\n"
            "File: file path\n\n"
            "Could not find glossary term: term\n\n"
            "Options:\n"
            "  - Is the glossary term key defined in the\n"
            "    application structure file?\n"
            "  - Is the term spelt correctly?\n"
        )
        self.assertEqual(exception.__str__(), expected_string)
