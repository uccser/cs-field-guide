"""Module for the custom Django loadinteractives command."""

import os.path
from django.core.management.base import BaseCommand
from django.conf import settings
from utils.BaseLoader import BaseLoader
from utils.LoaderFactory import LoaderFactory
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


class Command(BaseCommand):
    """Required command class for the custom Django loadinteractives command.

    Raises:
        MissingRequiredFieldError: When a config (yaml) file is missing a
            required field.
    """

    help = "Creates Interacive objects as defined in config files and stores them in the database."

    def handle(self, *args, **options):
        """Automatically called when the loadinteractives command is given."""
        factory = LoaderFactory()

        base_loader = BaseLoader()
        base_path = settings.INTERACTIVES_CONTENT_BASE_PATH

        structure_file_path = os.path.join(
            base_path,
            "interactives.yaml"
        )

        structure_file = base_loader.load_yaml_file(structure_file_path)

        interactives = structure_file.get("interactives", None)
        if interactives is None or not isinstance(structure_file["interactives"], dict):
            raise MissingRequiredFieldError(
                structure_file,
                ["interactives"],
                "Interactive"
            )
        else:
            for (interactive_slug, interactive_structure) in interactives.items():
                factory.create_interactives_loader(
                    structure_file_path,
                    interactive_slug,
                    interactive_structure,
                    base_path
                ).load()
            base_loader.log("All interactives loaded!\n")
