from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class AppendicesCurriculumGuidesViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_curriculum_guides_view(self):
        url = reverse("appendices:curriculum-guides")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
