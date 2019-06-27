"""Create test data for curriculum guide tests."""

import os.path
import yaml

from curriculum_guides.models import (
    CurriculumGuide,
    CurriculumGuideSection,
)


class CurriculumGuidesTestDataGenerator:
    """Class for generating test data for curriculum guides."""

    def __init__(self):
        """Create CurriculumGuidesTestDataGenerator object."""
        self.BASE_PATH = "tests/curriculum_guides/"
        self.LOADER_ASSET_PATH = os.path.join(self.BASE_PATH, "loaders/assets/")

    def load_yaml_file(self, yaml_file_path):
        """Load a yaml file.

        Args:
            yaml_file_path:  The path to a given yaml file (str).

        Returns:
            Contents of a yaml file.
        """
        yaml_file = open(yaml_file_path, encoding="UTF-8").read()
        return yaml.load(yaml_file)

    def create_curriculum_guide(self, number, introduction=None):
        """Create CurriculumGuide object.

        Args:
            number: Identifier of the guide (int).

        Returns:
            CurriculumGuide object.
        """
        if not introduction:
            introduction = "<p>Introduction for curriculum guide {}</p>".format(number)
        curriculum_guide = CurriculumGuide(
            slug="curriculum_guide-{}".format(number),
            name="CurriculumGuide {}".format(number),
            number=number,
            introduction=introduction,
        )
        curriculum_guide.save()
        return curriculum_guide

    def create_curriculum_guide_section(self, curriculum_guide, number):
        """Create CurriculumGuideSection object.

        Args:
            number: Identifier of the curriculum guide section (int).

        Returns:
            CurriculumGuideSection object.
        """
        curriculum_guide_section = CurriculumGuideSection(
            slug="section-{}".format(number),
            name="Section {}".format(number),
            number=number,
            content="<p>Content for section {}.</p>".format(number),
            curriculum_guide=curriculum_guide
        )
        curriculum_guide_section.save()
        return curriculum_guide_section
