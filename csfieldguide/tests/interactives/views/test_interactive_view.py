from http import HTTPStatus
from django.urls import reverse
from django.test import override_settings
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from tests.helpers import template_settings_for_test

templates = template_settings_for_test("tests/interactives/views/assets/templates/")


@override_settings(TEMPLATES=templates)
class InteractivesViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.language = "en"

    def test_interactive_view_whole_page_with_valid_slug(self):
        self.test_data.create_interactive("1")
        kwargs = {
            "interactive_slug": "interactive-1"
        }
        url = reverse("interactives:interactive", kwargs=kwargs)
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
