from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
# from interactives.management.commands._InteractiveLoader import InteractiveLoader
# from interactives.models import Interactive


class InteractiveLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.loader_name = "interactives"

    def test_interactives_interactive_loader_single_interactive(self):
        pass
