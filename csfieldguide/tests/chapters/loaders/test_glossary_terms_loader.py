import os.path

from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader
from chapters.models import GlossaryTerm


class GlossaryTermsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "glossary-terms"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)
        # placeholder, required parameter for error raised in chapter loader
        self.config_file = "basic-config.yaml"

    def test_basic_glossary_terms(self):
        """
        """
        glossary_folder = "glossary-1"

        glossary_terms_loader = GlossaryTermsLoader(
            structure_file_path=self.config_file,
            glossary_directory_name=glossary_folder,
            BASE_PATH=self.base_path
        )
        glossary_terms_loader.load()

        self.assertQuerysetEqual(
            GlossaryTerm.objects.order_by("term"),
            [
                "<GlossaryTerm: Term 1>",
                "<GlossaryTerm: Term 2>",
                "<GlossaryTerm: Term 3>",
            ]
        )

    def test_missing_title(self):
        """
        """
        pass

    def test_title_empty_content(self):
        """
        """
        pass

    def tests_empty_file(self):
        """
        """
        pass

    def test_missing_markdown_file(self):
        """
        """
        pass
