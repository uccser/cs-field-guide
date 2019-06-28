from tests.BaseTestWithDB import BaseTestWithDB

from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from curriculum_guides.models import CurriculumGuideSection


class CurriculumGuideSectionSectionModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()

    def test_curriculum_guides_curriculum_guide_section_model_str(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        section = CurriculumGuideSection.objects.create(
            slug="the-first-section",
            name="The First Section",
            number=1,
            content="<p>Some content for the first section</p>.",
            curriculum_guide=curriculum_guide
        )
        self.assertEqual(
            section.__str__(),
            "The First Section"
        )

    def test_curriculum_guides_curriculum_guide_section_model_one_section(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        CurriculumGuideSection.objects.create(
            slug="section-1",
            name="Section 1",
            number=1,
            content="<p>Some content for section 1</p>.",
            curriculum_guide=curriculum_guide
        )
        self.assertQuerysetEqual(
            CurriculumGuideSection.objects.all(),
            [
                "<CurriculumGuideSection: Section 1>",
            ],
        )

    def test_curriculum_guides_curriculum_guide_section_model_two_curriculum_guides(self):
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        CurriculumGuideSection.objects.create(
            slug="section-1",
            name="Section 1",
            number=1,
            content="<p>Some content for the first section</p>.",
            curriculum_guide=curriculum_guide
        )
        CurriculumGuideSection.objects.create(
            slug="section-2",
            name="Section 2",
            number=2,
            content="<p>Some content for the second section</p>.",
            curriculum_guide=curriculum_guide
        )
        self.assertQuerysetEqual(
            CurriculumGuideSection.objects.all(),
            [
                "<CurriculumGuideSection: Section 1>",
                "<CurriculumGuideSection: Section 2>"
            ],
        )
