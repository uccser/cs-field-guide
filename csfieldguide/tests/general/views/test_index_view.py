from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class IndexViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_general_index_view(self):
        url = reverse("general:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
