from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class GlossaryURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_chapters_valid_glossary_url(self):
        url = reverse("chapters:glossary")
        self.assertEqual(url, "/en/chapters/glossary/")

    def test_chapters_valid_glossary_json_url(self):
        url = reverse("chapters:glossary_json")
        self.assertEqual(url, "/en/chapters/glossary/json/")
