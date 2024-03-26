from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class AppendicesListViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_list_view(self):
        url = reverse("appendices:appendices")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
