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
        self.base_path = self.test_data.LOADER_ASSET_PATH
        self.config_file = "basic-config.yaml"

    def test_interactives_interactives_loader_single_interactive(self):
        interactive_slug = "interactive-1"
        interactive_structure = {
            "name": "Interactive 1"
        }

        interactive_loader = InteractivesLoader(
            structure_file_path=self.config_file,
            interactive_slug=interactive_slug,
            interactive_structure=interactive_structure,
            BASE_PATH=self.base_path
        )
        interactive_loader.load()

        self.assertQuerysetEqual(
            Interactive.objects.all(),
            ["<Interactive: Interactive 1>"]
        )

    def test_interactives_interactives_missing_name(self):
        interactive_slug = "interactive-1"
        interactive_structure = {}

        interactive_loader = InteractivesLoader(
            structure_file_path=self.config_file,
            interactive_slug=interactive_slug,
            interactive_structure=interactive_structure,
            BASE_PATH=self.base_path
        )

        self.assertRaises(
            MissingRequiredFieldError,
            interactive_loader.load
        )
