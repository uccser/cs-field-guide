from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from django.urls import reverse


class IndexViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.language = "en"

    def test_curriculum_guides_index_view_with_one_curriculum_guide(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        self.test_data.create_curriculum_guide_section(curriculum_guide, "1")

        url = reverse("curriculum_guides:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["curriculum_guides"],
            ["<CurriculumGuide: CurriculumGuide 1>"]
        )

    def test_curriculum_guides_index_view_with_two_curriculum_guides(self):
        self.test_data.create_curriculum_guide("1")
        self.test_data.create_curriculum_guide("2")

        url = reverse("curriculum_guides:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["curriculum_guides"],
            [
                "<CurriculumGuide: CurriculumGuide 1>",
                "<CurriculumGuide: CurriculumGuide 2>"
            ]
        )

    def test_curriculum_guides_index_view_with_three_curriculum_guides(self):
        self.test_data.create_curriculum_guide("2")
        self.test_data.create_curriculum_guide("1")
        self.test_data.create_curriculum_guide("3")

        url = reverse("curriculum_guides:index")
        response = self.client.get(url)

        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertQuerysetEqual(
            response.context["curriculum_guides"],
            [
                "<CurriculumGuide: CurriculumGuide 1>",
                "<CurriculumGuide: CurriculumGuide 2>",
                "<CurriculumGuide: CurriculumGuide 3>"
            ]
        )
