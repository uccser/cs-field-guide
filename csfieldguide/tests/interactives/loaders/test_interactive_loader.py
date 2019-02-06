from django.utils import translation
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from interactives.management.commands._InteractivesLoader import InteractivesLoader
from interactives.models import Interactive
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError


class InteractivesLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.loader_name = "interactives"
        self.BASE_PATH = "tests/interactives/loaders/assets/interactives/"

    def test_interactives_interactives_loader_single_interactive(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="basic-config.yaml"
        )
        interactive_loader.load()
        self.assertQuerysetEqual(
            Interactive.objects.all(),
            ["<Interactive: Interactive Untranslated>"]
        )

    def test_interactives_interactives_loader_multiple_languages(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="multiple-languages.yaml"
        )
        interactive_loader.load()
        self.assertQuerysetEqual(
            Interactive.objects.all(),
            ["<Interactive: Interactive Multiple Languages>"]
        )
        interactive = Interactive.objects.get(slug="interactive-multiple-languages")
        self.assertEqual(
            "Interactive Multiple Languages",
            interactive.name
        )
        self.assertEqual(
            "interactives/template-en.html",
            interactive.template
        )
        with translation.override("de"):
            self.assertEqual(
                "Interactive Multiple Languages in German",
                interactive.name
            )
            self.assertEqual(
                "interactives/template-de.html",
                interactive.template
            )
        with translation.override("fr"):
            self.assertEqual(
                "Interactive Multiple Languages",  # Fallback to English
                interactive.name
            )
            self.assertEqual(
                "interactives/template-fr.html",
                interactive.template
            )
        self.assertSetEqual(set(["en", "de"]), set(interactive.languages))

    def test_interactives_interactives_missing_name(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="missing-name.yaml"
        )
        self.assertRaises(
            MissingRequiredFieldError,
            interactive_loader.load
        )

    def test_interactives_interactives_missing_languages(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="missing-languages.yaml"
        )
        interactive_loader.load()
        interactive = Interactive.objects.get(slug="interactive-missing-languages")
        self.assertEqual(
            "Interactive Missing Languages",
            interactive.name
        )
        self.assertEqual(
            "",
            interactive.template
        )

    def test_interactives_interactives_invalid_language(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="invalid-language.yaml"
        )
        self.assertRaises(
            InvalidYAMLValueError,
            interactive_loader.load
        )

    def test_resource_loader_translation(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="translation.yaml"
        )
        interactive_loader.load()
        interactives = Interactive.objects.all()
        self.assertEqual(1, len(interactives))
        interactive = interactives[0]
        self.assertEqual("Interactive English", interactive.name)
        with translation.override("de"):
            self.assertEqual("Interactive German", interactive.name)

    def test_interactives_is_interactive_true(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="basic-config.yaml"
        )
        interactive_loader.load()
        interactive = Interactive.objects.get(slug="interactive-untranslated")
        self.assertEqual(
            True,
            interactive.is_interactive
        )

    def test_interactives_is_interactive_false(self):
        interactive_loader = InteractivesLoader(
            base_path=self.BASE_PATH,
            content_path="",
            structure_filename="is-interactive-false.yaml"
        )
        interactive_loader.load()
        interactive = Interactive.objects.get(slug="is-interactive-false")
        self.assertEqual(
            False,
            interactive.is_interactive
        )
