from django.utils import translation
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from interactives.management.commands._InteractivesLoader import InteractivesLoader
from interactives.models import Interactive
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


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
