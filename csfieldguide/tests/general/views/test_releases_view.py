from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class ReleasesViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_general_releases_view(self):
        """Tests view for releases page.
        """
        url = reverse("general:releases")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
