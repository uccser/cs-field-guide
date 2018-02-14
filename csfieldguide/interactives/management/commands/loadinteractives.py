"""Module for the custom Django loadinteractives command."""

import os.path
from django.core.management.base import BaseCommand
from utils.BaseLoader import BaseLoader
from utils.LoaderFactory import LoaderFactory
from interactives.models import Interactive


class Command(BaseCommand):
    """Required command class for the custom Django loadinteractives command.

    Raises:
        MissingRequiredFieldError: When a config (yaml) file is missing a
            required field.
    """

    help = "Converts Markdown files listed in structure file and stores"

    def handle(self, *args, **options):
        """Automatically called when the loadinteractives command is given."""
        factory = LoaderFactory()

        base_loader = BaseLoader()
        BASE_PATH = "interactives/"

        structure_file_path = os.path.join(
            BASE_PATH,
            "interactive_list.yaml"
        )

        structure_file = base_loader.load_yaml_file(structure_file_path)

        interactives = structure_file.get("interactives", None)
        if interactives is None or not isinstance(structure_file["interactives"], list):
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
                    BASE_PATH
                ).load()
            base_loader.log("All interactives loaded!\n")
