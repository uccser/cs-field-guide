from tests.BaseTestWithDB import BaseTestWithDB
from curriculum_guides.models import CurriculumGuide


class CurriculumGuideModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_curriculum_guides_curriculum_guide_model_str(self):
        curriculum_guide = CurriculumGuide.objects.create(
            slug="a-good-curriculum_guide",
            name="A Good Curriculum Guide",
            number=1
        )
        self.assertEqual(
            curriculum_guide.__str__(),
            "A Good Curriculum Guide"
        )

    def test_curriculum_guides_curriculum_guide_model_one_curriculum_guide(self):
        CurriculumGuide.objects.create(
            slug="curriculum_guide-1",
            name="CurriculumGuide 1",
            number=1,
        )
        self.assertQuerysetEqual(
            CurriculumGuide.objects.all(),
            [
                "<CurriculumGuide: CurriculumGuide 1>",
            ],
        )

    def test_curriculum_guides_curriculum_guide_model_two_curriculum_guides(self):
        CurriculumGuide.objects.create(
            slug="curriculum_guide-1",
            name="CurriculumGuide 1",
            number=1,
        )
        CurriculumGuide.objects.create(
            slug="curriculum_guide-2",
            name="CurriculumGuide 2",
            number=2,
        )
        self.assertQuerysetEqual(
            CurriculumGuide.objects.all(),
            [
                "<CurriculumGuide: CurriculumGuide 1>",
                "<CurriculumGuide: CurriculumGuide 2>"
            ],
        )
