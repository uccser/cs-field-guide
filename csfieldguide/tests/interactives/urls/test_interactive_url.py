from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from django.urls import reverse


class InteractiveURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.language = "en"

    def test_interactives_valid_interactive_url(self):
        self.test_data.create_interactive("1")

        kwargs = {
            "interactive_slug": "interactive-1"
        }

        url = reverse("interactives:interactive", kwargs=kwargs)
        self.assertEqual(url, "/en/interactives/interactive-1/")
