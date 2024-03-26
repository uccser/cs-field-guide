from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class AppendicesURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_index_url(self):
        url = reverse("appendices:appendices")
        self.assertEqual(url, "/en/appendices/")
