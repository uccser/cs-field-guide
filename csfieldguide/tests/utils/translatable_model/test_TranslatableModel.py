"""Test class for TranslatableModel."""

from django.test import TestCase, override_settings
from django.utils import translation
from tests.utils.translatable_model.models import MockTranslatableModel

AVAILABLE_LANGUAGES_EN_DE = (
    ("en", "English"),
    ("de", "German")
)


class TranslatableModelTest(TestCase):
    """Test class for TranslatableModel."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.base_path = "tests/utils/translatable_model/assets"

    @override_settings(LANGUAGES=AVAILABLE_LANGUAGES_EN_DE)
    def test_translation_managers(self):
        model_1 = MockTranslatableModel()
        model_1.name = "1"
        model_1.languages = ["en", "de"]
        model_1.save()
        model_2 = MockTranslatableModel()
        model_2.name = "2"
        model_2.languages = ["en"]
        model_2.save()
        model_3 = MockTranslatableModel()
        model_3.name = "3"
        model_3.languages = ["en"]
        model_3.save()

        # Check all available in English
        with translation.override("en"):
            self.assertEqual(
                len(MockTranslatableModel.translated_objects.all()),
                3,
            )
            self.assertQuerysetEqual(
                MockTranslatableModel.translated_objects.order_by("name"),
                [
                    "<MockTranslatableModel: 1>",
                    "<MockTranslatableModel: 2>",
                    "<MockTranslatableModel: 3>",
                ],
            )

        with translation.override("de"):
            # Check one available in German
            self.assertEqual(
                len(MockTranslatableModel.translated_objects.all()),
                1,
            )
            self.assertQuerysetEqual(
                MockTranslatableModel.translated_objects.order_by("name"),
                [
                    "<MockTranslatableModel: 1>",
                ],
            )
            # Check two unavailable in German
            self.assertEqual(
                len(MockTranslatableModel.untranslated_objects.all()),
                2,
            )
            self.assertQuerysetEqual(
                MockTranslatableModel.untranslated_objects.order_by("name"),
                [
                    "<MockTranslatableModel: 2>",
                    "<MockTranslatableModel: 3>",
                ],
            )
