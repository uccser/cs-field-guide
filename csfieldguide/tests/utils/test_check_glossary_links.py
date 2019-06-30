"""Test class for check_glossary_links module."""

from utils import check_glossary_links
from utils.errors.CouldNotFindGlossaryTermError import CouldNotFindGlossaryTermError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator


class CheckRequiredFilesTest(BaseTestWithDB):
    """Test class for check_glossary_links in check_required_files module."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()

    def test_check_glossary_links_valid(self):
        self.test_data.create_glossary_term(1)
        self.test_data.create_glossary_term(2)
        self.test_data.create_glossary_term(3)
        glossary_links = {
            "glossary-term-1": [],
            "glossary-term-2": [],
            "glossary-term-3": [],
        }
        check_glossary_links.check_converter_glossary_links(glossary_links, "md file path")

    def test_check_glossary_links_invalid(self):
        glossary_links = {"glossary-term-1": []}
        self.assertRaises(
            CouldNotFindGlossaryTermError,
            check_glossary_links.check_converter_glossary_links,
            glossary_links,
            "md file path"
        )
