from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class SitemapURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_sitemap_url(self):
        url = reverse("appendices:sitemap")
        self.assertEqual(url, "/en/appendices/sitemap/")
