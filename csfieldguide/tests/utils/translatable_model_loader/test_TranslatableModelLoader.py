"""Test class for TranslatableModelLoader."""

import imp
from unittest import mock

from modeltranslation import settings as mt_settings
from modeltranslation.translator import translator, TranslationOptions

from django.db import models
from django.test import SimpleTestCase
from django.utils import translation

from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.TranslatableModel import TranslatableModel
from utils.errors.MissingRequiredModelsError import MissingRequiredModelsError
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.CouldNotFindYAMLFileError import CouldNotFindYAMLFileError
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError
from utils.language_utils import get_available_languages


class MockTranslatableModel(TranslatableModel):
    """Mock TranslatableModel for testing TranslatableModelLoader functionality."""
    # Fields with fallback to english disabled
    nofallback1 = models.CharField(default="")
    nofallback2 = models.CharField(default="")
    nofallback3 = models.CharField(default="")

    # Fields with fallback to english enabled
    fallback1 = models.CharField(default="")
    fallback2 = models.CharField(default="")

    class Meta:
        app_label = "test",


class MockTranslatableModelTranslationOptions(TranslationOptions):
    """Translation options for MockTranslatableModel model."""

    fields = ("nofallback1", "nofallback2", "nofallback3", "fallback1", "fallback2")
    fallback_undefined = {
        "nofallback1": None,
        "nofallback2": None,
        "nofallback3": None,
    }


class TranslatableModelLoaderTest(SimpleTestCase):
    """Test class for TranslatableModelLoader."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.base_path = "tests/utils/translatable_model_loader/assets"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        imp.reload(mt_settings)  # Let modeltranslation pick up any overridden settings
        translator.register(MockTranslatableModel, MockTranslatableModelTranslationOptions)

    def test_get_yaml_translations_english(self):

        yaml_file = "basic.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        translations = loader.get_yaml_translations(yaml_file)

        self.assertIsInstance(translations, dict)
        self.assertSetEqual(set(["model1", "model2"]), set(translations.keys()))

        model1_translations = translations["model1"]
        self.assertIsInstance(model1_translations, dict)
        self.assertSetEqual(set(["en"]), set(model1_translations.keys()))
        model1_english = model1_translations["en"]
        self.assertIsInstance(model1_english, dict)
        self.assertSetEqual(set(["field1", "field2"]), set(model1_english.keys()))
        self.assertEqual("value 1-1", model1_english["field1"])
        self.assertEqual("value 1-2", model1_english["field2"])

        model2_translations = translations["model2"]
        self.assertIsInstance(model2_translations, dict)
        self.assertSetEqual(set(["en"]), set(model2_translations.keys()))
        model2_english = model2_translations["en"]
        self.assertIsInstance(model2_english, dict)
        self.assertSetEqual(set(["field1", "field2"]), set(model2_english.keys()))
        self.assertEqual("value 2-1", model2_english["field1"])
        self.assertEqual("value 2-2", model2_english["field2"])

    def test_get_yaml_translations_english_missing_reqd_field(self):
        yaml_file = "missingreqdfield.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        with self.assertRaises(MissingRequiredFieldError):
            loader.get_yaml_translations(yaml_file, required_fields=["field1"])

    def test_get_yaml_translations_english_missing_reqd_slug(self):
        yaml_file = "missingreqdslug.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        with self.assertRaises(MissingRequiredModelsError):
            loader.get_yaml_translations(yaml_file, required_slugs=["model1", "model2"])

    def test_get_yaml_translations_english_missing_file_with_reqd_slugs(self):
        yaml_file = "doesnotexist.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        # With required slugs, a missing english yaml file should raise Exception
        with self.assertRaises(CouldNotFindYAMLFileError):
            loader.get_yaml_translations(yaml_file, required_slugs=["model1", "model2"])

    def test_get_yaml_translations_english_missing_yaml_no_reqd_slugs(self):
        yaml_file = "doesnotexist.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        # If no required slugs, no error should be raised
        loader.get_yaml_translations(yaml_file)

    def test_get_yaml_translations_field_map(self):
        yaml_file = "basic.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        translations = loader.get_yaml_translations(
            yaml_file,
            field_map={"field1": "new_field1"}
        )
        model1 = translations["model1"]["en"]
        self.assertSetEqual(set(["new_field1", "field2"]), set(model1.keys()))
        self.assertEqual("value 1-1", model1["new_field1"])

    def test_get_yaml_translations_translated(self):
        yaml_file = "translation.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)
        translations = loader.get_yaml_translations(yaml_file)

        self.assertIsInstance(translations, dict)
        self.assertSetEqual(set(["model1", "model2"]), set(translations.keys()))

        model1_translations = translations["model1"]
        self.assertIsInstance(model1_translations, dict)
        self.assertSetEqual(set(["en", "de"]), set(model1_translations.keys()))

        model1_english = model1_translations["en"]
        self.assertIsInstance(model1_english, dict)
        self.assertSetEqual(set(["field1", "field2"]), set(model1_english.keys()))
        self.assertEqual("en value 1-1", model1_english["field1"])
        self.assertEqual("en value 1-2", model1_english["field2"])

        model1_german = model1_translations["de"]
        self.assertIsInstance(model1_german, dict)
        self.assertSetEqual(set(["field1", "field2"]), set(model1_german.keys()))
        self.assertEqual("de value 1-1", model1_german["field1"])
        self.assertEqual("de value 1-2", model1_german["field2"])

    def test_get_yaml_translations_translated_missing_reqd_field(self):
        yaml_file = "translationmissingreqdfield.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)

        # required fields only apply to default language (en) so no error should be raised
        translations = loader.get_yaml_translations(yaml_file, required_fields=["field1"])
        self.assertSetEqual(set(["field1", "field2"]), set(translations["model2"]["en"].keys()))
        self.assertSetEqual(set(["field2"]), set(translations["model2"]["de"].keys()))

    def test_get_yaml_translations_translated_missing_reqd_slug(self):
        yaml_file = "translationmissingreqdslug.yaml"
        loader = TranslatableModelLoader(base_path=self.base_path)

        # required slugs only apply to default language (en) so no error should be raised
        translations = loader.get_yaml_translations(yaml_file, required_slugs=["model1", "model2"])
        self.assertSetEqual(set(["en", "de"]), set(translations["model1"].keys()))
        self.assertSetEqual(set(["en"]), set(translations["model2"].keys()))

    def test_get_markdown_translations_english(self):
        filename = "basic.md"
        loader = TranslatableModelLoader(base_path=self.base_path)
        translations = loader.get_markdown_translations(filename)
        self.assertSetEqual(set(["en"]), set(translations.keys()))
        self.assertIn("Basic Content", translations["en"].html_string)
        self.assertIn("Heading", translations["en"].title)

    def test_get_markdown_translation_english_missing_file_required(self):
        filename = "doesnotexist.md"
        loader = TranslatableModelLoader(base_path=self.base_path)
        with self.assertRaises(CouldNotFindMarkdownFileError):
            loader.get_markdown_translations(filename, required=True)

    def test_get_markdown_translation_english_missing_file_not_required(self):
        filename = "doesnotexist.md"
        loader = TranslatableModelLoader(base_path=self.base_path)
        # Should not raise error if required is False
        loader.get_markdown_translations(filename, required=False)

    def test_get_markdown_translations_translated(self):
        filename = "translation.md"
        loader = TranslatableModelLoader(base_path=self.base_path)
        translations = loader.get_markdown_translations(filename)
        self.assertSetEqual(set(["en", "de"]), set(translations.keys()))

        en = translations["en"]
        self.assertIn("English Content", en.html_string)
        self.assertIn("English Heading", en.title)

        de = translations["de"]
        self.assertIn("German Content", de.html_string)
        self.assertIn("German Heading", de.title)

    def test_populate_translations(self):
        model = MockTranslatableModel()
        translations = {
            "en": {
                "fallback1": "english value 1",
                "nofallback1": "english value 2"
            },
            "de": {
                "fallback1": "german value 1",
                "nofallback1": "german value 2"
            }
        }
        TranslatableModelLoader.populate_translations(model, translations)
        self.assertEqual(model.fallback1, "english value 1")
        self.assertEqual(model.nofallback1, "english value 2")
        with translation.override("de"):
            self.assertEqual(model.fallback1, "german value 1")
            self.assertEqual(model.nofallback1, "german value 2")

    def test_mark_translation_availability_all_required_fields_present(self):
        model = MockTranslatableModel()
        model.fallback1 = "english value 1"
        model.nofallback1 = "english value 2"
        with translation.override("de"):
            model.fallback1 = "german value 1"
            model.nofallback1 = "german value 2"
        TranslatableModelLoader.mark_translation_availability(model, required_fields=["fallback1", "nofallback1"])
        self.assertSetEqual(set(["en", "de"]), set(model.languages))

    def test_mark_translation_availability_required_fallback_field_missing(self):
        model = MockTranslatableModel()
        model.fallback1 = "english value 1"
        model.nofallback1 = "english value 2"
        with translation.override("de"):
            # Don't populate the field "fallback1" which has fallback enabled
            model.nofallback1 = "german value 2"
        TranslatableModelLoader.mark_translation_availability(model, required_fields=["fallback1", "nofallback1"])
        self.assertSetEqual(set(["en"]), set(model.languages))

    def test_mark_translation_availability_required_no_fallback_field_missing(self):
        model = MockTranslatableModel()
        model.fallback1 = "english value 1"
        model.nofallback1 = "english value 2"
        with translation.override("de"):
            # Don't populate the field "nofallback1" which does not have fallback enabled
            model.fallback1 = "german value 1"
        TranslatableModelLoader.mark_translation_availability(model, required_fields=["fallback1", "nofallback1"])
        self.assertSetEqual(set(["en"]), set(model.languages))

    def test_mark_translation_availability_required_fields_not_given(self):
        model = MockTranslatableModel()
        with mock.patch("utils.language_utils.get_available_languages", return_value=["en", "de", "fr"]):
            TranslatableModelLoader.mark_translation_availability(model)
        self.assertSetEqual(set(get_available_languages()), set(model.languages))

    def test_get_blank_translation_dictionary(self):
        translation_dict = TranslatableModelLoader.get_blank_translation_dictionary()
        self.assertSetEqual(set(get_available_languages()), set(translation_dict.keys()))
        self.assertDictEqual(translation_dict["en"], {})
        # Check to make sure it's not a dictionary of references to the same dictionary
        self.assertFalse(translation_dict["en"] is translation_dict["de"])
