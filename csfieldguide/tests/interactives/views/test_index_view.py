from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from django.urls import reverse


class IndexViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.language = "en"

    def test_interactives_index_view_with_zero_interactive(self):
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 0)

    def test_interactives_index_view_with_one_interactive(self):
        self.test_data.create_interactive(1)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 1)

    def test_interactives_index_view_with_multiple_interactives(self):
        self.test_data.create_interactive(1)
        self.test_data.create_interactive(2)
        self.test_data.create_interactive(3)
        url = reverse("interactives:index")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(len(response.context["interactives"]), 3)
