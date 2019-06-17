from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from django.urls import reverse


class CurriculumGuideURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.language = "en"

    def test_curriculum_guide_section_valid_url(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        kwargs = {
            "curriculum_guide_slug": curriculum_guide.slug,
        }
        url = reverse("curriculum_guides:curriculum_guide", kwargs=kwargs)
        self.assertEqual(url, "/en/curriculum-guides/curriculum_guide-1/")
