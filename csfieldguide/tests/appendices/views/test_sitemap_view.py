from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class AppendicesSitemapViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_sitemap_view(self):
        url = reverse("appendices:sitemap")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
