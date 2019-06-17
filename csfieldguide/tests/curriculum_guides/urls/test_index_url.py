from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class IndexURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_curriculum_guides_valid_index(self):
        url = reverse("curriculum_guides:index")
        self.assertEqual(url, "/en/curriculum-guides/")
