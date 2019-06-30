from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class ApcspURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_apcsp_url(self):
        url = reverse("appendices:apcsp")
        self.assertEqual(url, "/en/appendices/curriculum-guides/apcsp")
