from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from django.urls import reverse


class InteractivesViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.language = "en"

    def test_interactives_interactive_view_with_valid_slug(self):
        self.test_data.create_interactive("1")
        kwargs = {
            "interactive_slug": "interactive-1"
        }

        url = reverse("interactives:interactive", kwargs=kwargs)
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
