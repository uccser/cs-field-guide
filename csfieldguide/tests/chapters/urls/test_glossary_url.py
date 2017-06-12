from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class GlossaryURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_valid_glossary_url(self):
        url = reverse("chapters:glossary")
        self.assertEqual(url, "/en/chapters/glossary/")

        response = self.client.get(url)
        self.assertEqual(200, response.status_code)

    def test_valid_glossary_json_url(self):
        url = reverse("chapters:glossary_json")
        self.assertEqual(url, "/en/chapters/glossary/json/")

        response = self.client.get(url)
        self.assertEqual(404, response.status_code)
