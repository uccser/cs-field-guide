import os.path

from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader
from chapters.models import GlossaryTerm
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError


class GlossaryTermsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.loader_name = "glossary-terms"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)
        # placeholder, required parameter for error raised in chapter loader
        self.config_file = "config.yaml"

    def test_chapters_glossary_loader_single_glossary_terms(self):
        glossary_folder = "glossary-single"
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
            ]
        )

    def test_chapters_glossary_loader_multiple_glossary_terms(self):
        glossary_folder = "glossary-multiple"
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

    def test_chapters_glossary_loader_invalid_glossary_term_files(self):
        glossary_folder = "glossary-invalid-files"
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
            ]
        )

    def test_missing_title(self):
        glossary_folder = "glossary-missing-title"
        glossary_terms_loader = GlossaryTermsLoader(
            structure_file_path=self.config_file,
            glossary_directory_name=glossary_folder,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            glossary_terms_loader.load,
        )

    def test_title_empty_content(self):
        glossary_folder = "glossary-missing-content"
        glossary_terms_loader = GlossaryTermsLoader(
            structure_file_path=self.config_file,
            glossary_directory_name=glossary_folder,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            EmptyMarkdownFileError,
            glossary_terms_loader.load,
        )

    def tests_empty_file(self):
        glossary_folder = "glossary-empty-file"
        glossary_terms_loader = GlossaryTermsLoader(
            structure_file_path=self.config_file,
            glossary_directory_name=glossary_folder,
            BASE_PATH=self.base_path
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            glossary_terms_loader.load,
        )
