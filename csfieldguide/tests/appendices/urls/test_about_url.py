from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class AboutURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_about_url(self):
        url = reverse("appendices:about")
        self.assertEqual(url, "/en/appendices/about/")
