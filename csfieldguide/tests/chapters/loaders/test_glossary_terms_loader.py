import os.path
from django.utils import translation
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

    def test_basic_config(self):
        folder = "glossary-single"
        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        glossary_loader.load()
        glossary_objects = GlossaryTerm.objects.all()
        self.assertQuerysetEqual(
            glossary_objects,
            ["<GlossaryTerm: Term 1>"]
        )

    def test_multiple_files(self):
        folder = "glossary-multiple"
        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        glossary_loader.load()
        glossary_objects = GlossaryTerm.objects.order_by("term")
        self.assertQuerysetEqual(
            glossary_objects,
            [
                "<GlossaryTerm: Term 1>",
                "<GlossaryTerm: Term 2>",
                "<GlossaryTerm: Term 3>"
            ],
        )

    def test_invalid_files(self):
        folder = "glossary-invalid-files"
        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        glossary_loader.load()
        glossary_objects = GlossaryTerm.objects.all()
        self.assertQuerysetEqual(
            glossary_objects,
            ["<GlossaryTerm: Term 1>"]
        )

    def test_translation(self):
        folder = "glossary-translation"

        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        glossary_loader.load()

        glossary_objects = GlossaryTerm.objects.all()
        self.assertEqual(2, len(glossary_objects))

        translated_term = GlossaryTerm.objects.get(slug="glossary-term-1")
        untranslated_term = GlossaryTerm.objects.get(slug="glossary-term-2")

        self.assertSetEqual(set(["en", "de"]), set(translated_term.languages))
        self.assertSetEqual(set(["en"]), set(untranslated_term.languages))

        self.assertEqual("Term 1 English", translated_term.term)
        self.assertIn("English definition.", translated_term.definition)
        with translation.override("de"):
            self.assertEqual("Term 1 German", translated_term.term)
            self.assertIn("German definition.", translated_term.definition)

    def test_missing_title(self):
        folder = "glossary-missing-title"
        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            glossary_loader.load,
        )

    def test_title_empty_content(self):
        folder = "glossary-missing-content"
        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        self.assertRaises(
            EmptyMarkdownFileError,
            glossary_loader.load,
        )

    def tests_empty_file(self):
        folder = "glossary-empty-file"
        glossary_loader = GlossaryTermsLoader(base_path=self.base_path, content_path=folder)
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            glossary_loader.load,
        )
