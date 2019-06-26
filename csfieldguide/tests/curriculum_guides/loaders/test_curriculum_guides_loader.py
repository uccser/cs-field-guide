import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from curriculum_guides.management.commands._CurriculumGuidesLoader import CurriculumGuidesLoader
from curriculum_guides.models import CurriculumGuide
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError


class CurriculumGuidesLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.loader_name = "curriculum_guides"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)

    def test_curriculum_guides_curriculum_guide_loader_single_curriculum_guide(self):
        test_slug = "curriculum_guide-1"
        factory = mock.Mock()
        curriculum_guide_loader = CurriculumGuidesLoader(
            factory,
            curriculum_guide_number=1,
            content_path=test_slug,
            base_path=self.base_path,
            structure_filename="{}.yaml".format(test_slug)
        )
        curriculum_guide_loader.load()
        self.assertQuerysetEqual(
            CurriculumGuide.objects.all(),
            ["<CurriculumGuide: Curriculum Guide 1>"]
        )
        self.assertSetEqual(
            set(["en"]),
            set(CurriculumGuide.objects.get(slug="curriculum_guide-1").languages)
        )

    def test_curriculum_guides_curriculum_guide_loader_introduction_missing_heading(self):
        test_slug = "missing-heading"
        factory = mock.Mock()
        curriculum_guide_loader = CurriculumGuidesLoader(
            factory,
            curriculum_guide_number=1,
            content_path=test_slug,
            base_path=self.base_path,
            structure_filename="{}.yaml".format(test_slug)
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            curriculum_guide_loader.load
        )

    def test_curriculum_guides_curriculum_guide_loader_introduction_missing_content(self):
        test_slug = "missing-content"
        factory = mock.Mock()
        curriculum_guide_loader = CurriculumGuidesLoader(
            factory,
            curriculum_guide_number=1,
            content_path=test_slug,
            base_path=self.base_path,
            structure_filename="{}.yaml".format(test_slug)
        )
        self.assertRaises(
            EmptyMarkdownFileError,
            curriculum_guide_loader.load
        )

    def test_curriculum_guides_curriculum_guide_loader_missing_sections(self):
        test_slug = "missing-sections"
        factory = mock.Mock()
        curriculum_guide_loader = CurriculumGuidesLoader(
            factory,
            curriculum_guide_number=1,
            content_path=test_slug,
            base_path=self.base_path,
            structure_filename="{}.yaml".format(test_slug)
        )
        self.assertRaises(
            MissingRequiredFieldError,
            curriculum_guide_loader.load
        )
