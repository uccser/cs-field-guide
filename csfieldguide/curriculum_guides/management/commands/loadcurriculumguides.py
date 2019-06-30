"""Module for the custom Django loadcurriculumguides command."""

import os.path
from django.core.management.base import BaseCommand
from django.conf import settings
from utils.BaseLoader import BaseLoader
from utils.LoaderFactory import LoaderFactory
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError


class Command(BaseCommand):
    """Required command class for the custom Django loadcurriculumguides command.

    Raises:
        MissingRequiredFieldError: when a config (yaml) file is missing a required
            field.
    """

    help = "Converts Markdown files listed in structure file and stores"

    def handle(self, *args, **options):
        """Automatically called when the loadcurriculumguides command is given."""
        factory = LoaderFactory()

        # Get structure and content files
        base_loader = BaseLoader()
        base_path = settings.CURRICULUM_GUIDES_CONTENT_BASE_PATH

        structure_file_path = os.path.join(
            base_path,
            base_loader.structure_dir,
            "structure.yaml"
        )

        structure_file = base_loader.load_yaml_file(structure_file_path)

        curriculum_guides = structure_file.get("curriculum_guides", None)
        if curriculum_guides is None:
            raise MissingRequiredFieldError(
                structure_file_path,
                ["curriculum_guides"],
                "Application Structure"
            )
        else:
            for curriculum_guide_slug in curriculum_guides:
                curriculum_guide_structure_file = "{}.yaml".format(curriculum_guide_slug)

                curriculum_guide_number = curriculum_guides[curriculum_guide_slug].get("curriculum-guide-number", None)
                if curriculum_guide_number is None:
                    raise MissingRequiredFieldError(
                        structure_file_path,
                        ["curriculum_guide_number"],
                        "Application Structure for Curriculum Guide {}".format(curriculum_guide_slug)
                    )
                if isinstance(curriculum_guide_number, int) is False:
                    raise InvalidYAMLValueError(
                        structure_file_path,
                        "curriculum-guide-number - value '{}' is invalid".format(curriculum_guide_number),
                        "curriculum-guide-number must be an integer value."
                    )
                factory.create_curriculum_guide_loader(
                    base_path=base_path,
                    content_path=curriculum_guide_slug,
                    curriculum_guide_number=curriculum_guide_number,
                    structure_filename=curriculum_guide_structure_file,
                ).load()

            base_loader.log("All curriculum guides loaded!")
            base_loader.log("")
