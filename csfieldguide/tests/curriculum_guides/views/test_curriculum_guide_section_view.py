from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from django.urls import reverse


class CurriculumGuideSectionViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.language = "en"

    def test_curriculum_guides_curriculum_guide_section_view_with_valid_slug(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        self.test_data.create_curriculum_guide_section(curriculum_guide, "1")

        kwargs = {
            "curriculum_guide_slug": "curriculum_guide-1",
            "curriculum_guide_section_slug": "section-1"
        }

        url = reverse("curriculum_guides:curriculum_guide_section", kwargs=kwargs)
        self.assertEqual(url, "/en/curriculum-guides/curriculum_guide-1/section-1/")

        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
