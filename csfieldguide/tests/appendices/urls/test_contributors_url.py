from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class ContributorsURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_contributors_url(self):
        url = reverse("appendices:contributors")
        self.assertEqual(url, "/en/appendices/contributors/")
