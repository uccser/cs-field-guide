from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class CurriculumGuidesURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_curriculum_guides_url(self):
        url = reverse("appendices:curriculum-guides")
        self.assertEqual(url, "/en/appendices/curriculum-guides")
