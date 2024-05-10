from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from django.urls import reverse


class CurriculumGuidesRedirectURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.language = "en"

    def test_appendices_valid_index_url(self):
        url = "/en/appendices/curriculum-guides/"
        response = self.client.get(url)

        expected_redirect_url = reverse("curriculum_guides:index")
        self.assertRedirects(
            response,
            expected_redirect_url,
            fetch_redirect_response=False,
            status_code=301,
        )

    def test_appendices_valid_guide_url(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        kwargs = {
            "curriculum_guide_slug": curriculum_guide.slug,
        }

        url = "/en/appendices/curriculum-guides/curriculum_guide-1/"
        response = self.client.get(url)

        expected_redirect_url = reverse(
            "curriculum_guides:curriculum_guide", kwargs=kwargs
        )
        self.assertRedirects(
            response,
            expected_redirect_url,
            fetch_redirect_response=False,
            status_code=301,
        )
