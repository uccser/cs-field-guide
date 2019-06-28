from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from django.urls import reverse


class CurriculumGuideViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.language = "en"

    def test_curriculum_guide_view_with_valid_slug(self):
        curriculum_guide = self.test_data.create_curriculum_guide(1)
        kwargs = {
            "curriculum_guide_slug": curriculum_guide.slug,
        }
        url = reverse("curriculum_guides:curriculum_guide", kwargs=kwargs)
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertEqual(
            response.context["curriculum_guide"],
            curriculum_guide
        )

    def test_curriculum_guide_view_with_sections(self):
        curriculum_guide = self.test_data.create_curriculum_guide(1)
        self.test_data.create_curriculum_guide_section(curriculum_guide, 1)
        self.test_data.create_curriculum_guide_section(curriculum_guide, 2)
        self.test_data.create_curriculum_guide_section(curriculum_guide, 3)
        kwargs = {
            "curriculum_guide_slug": curriculum_guide.slug,
        }
        url = reverse("curriculum_guides:curriculum_guide", kwargs=kwargs)
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["curriculum_guide_sections"],
            [
                "<CurriculumGuideSection: Section 1>",
                "<CurriculumGuideSection: Section 2>",
                "<CurriculumGuideSection: Section 3>",
            ]
        )
