from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class ReleasesURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_general_valid_releases_url(self):
        url = reverse("general:releases")
        self.assertEqual(url, "/en/releases")
