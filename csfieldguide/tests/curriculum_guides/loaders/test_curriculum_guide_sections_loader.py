import os.path
from unittest import mock
from django.core.exceptions import ValidationError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.curriculum_guides.CurriculumGuidesTestDataGenerator import CurriculumGuidesTestDataGenerator
from curriculum_guides.management.commands._CurriculumGuideSectionsLoader import CurriculumGuideSectionsLoader
from curriculum_guides.models import CurriculumGuideSection
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError


class CurriculumGuideSectionsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = CurriculumGuidesTestDataGenerator()
        self.loader_name = "curriculum_guide-sections"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)

    def test_curriculum_guides_curriculum_guide_section_loader_single_section(self):
        test_slug = "single-section"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        curriculum_guide_section_loader.load()
        self.assertQuerysetEqual(
            CurriculumGuideSection.objects.all(),
            ["<CurriculumGuideSection: This is the section heading>"]
        )

    def test_curriculum_guides_curriculum_guide_section_loader_multiple_sections(self):
        test_slug = "multiple-sections"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        curriculum_guide_section_loader.load()
        self.assertQuerysetEqual(
            CurriculumGuideSection.objects.all(),
            [
                "<CurriculumGuideSection: This is the first section>",
                "<CurriculumGuideSection: This is the second section>"
            ]
        )

    def test_curriculum_guides_curriculum_guide_section_loader_missing_section_data(self):
        test_slug = "missing-section-data"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            MissingRequiredFieldError,
            curriculum_guide_section_loader.load
        )

    def test_curriculum_guides_curriculum_guide_section_loader_missing_section_number(self):
        test_slug = "missing-section-number"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            MissingRequiredFieldError,
            curriculum_guide_section_loader.load
        )

    def test_curriculum_guides_curriculum_guide_section_loader_invalid_section_number(self):
        test_slug = "invalid-section-number"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            curriculum_guide_section_loader.load
        )

    def test_curriculum_guides_curriculum_guide_section_loader_duplicate_section_numbers(self):
        test_slug = "duplicate-section-numbers"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            ValidationError,
            curriculum_guide_section_loader.load
        )

    def test_curriculum_guides_curriculum_guide_section_loader_missing_name(self):
        test_slug = "missing-name"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            curriculum_guide_section_loader.load
        )

    def test_curriculum_guides_curriculum_guide_section_loader_non_sequential_section_number(self):
        test_slug = "non-sequential-section-numbers"
        curriculum_guide = self.test_data.create_curriculum_guide("1")
        factory = mock.Mock()
        curriculum_guide_section_loader = CurriculumGuideSectionsLoader(
            factory,
            curriculum_guide,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            InvalidYAMLValueError,
            curriculum_guide_section_loader.load
        )
