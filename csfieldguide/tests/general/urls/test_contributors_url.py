from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class ContributorsURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_general_valid_contributors_url(self):
        url = reverse("general:contributors")
        self.assertEqual(url, "/en/contributors")
