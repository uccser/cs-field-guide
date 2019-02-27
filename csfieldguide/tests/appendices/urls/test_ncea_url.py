from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class NceaURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_ncea_url(self):
        url = reverse("appendices:ncea")
        self.assertEqual(url, "/en/appendices/curriculum-guides/ncea")
