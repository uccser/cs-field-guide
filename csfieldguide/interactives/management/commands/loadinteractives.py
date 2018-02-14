"""Module for the custom Django loadinteractives command."""

import os.path
from django.core.management.base import BaseCommand

from utils.BaseLoader import BaseLoader
from interactives.models import Interactive


class Command(BaseCommand):
    """Required command class for the custom Django loadinteractives command.

    Raises:
        MissingRequiredFieldError: when no object can be found with the matching
                attribute.
    """

    help = "Converts Markdown files listed in structure file and stores"

    def handle(self, *args, **options):
        """Automatically called when the loadinteractives command is given."""
        # Hardcoded for testing, TODO this should be in _InteractiveLoader.py

        base_loader = BaseLoader()
        BASE_PATH = "interactives/"

        structure_file_path = os.path.join(
            BASE_PATH,
            "interactive_list.yaml"
        )

        structure_file = base_loader.load_yaml_file(structure_file_path)

        interactives = structure_file['interactives']

        for (interactive_slug,interactive_structure) in interactives.items():
            new_interactive = Interactive(
                slug=interactive_slug,
                name=interactive_structure["name"],
                template="interactives/{}.html".format(interactive_slug)
            )
            new_interactive.save()
            base_loader.log("Added Interactive: {}".format(new_interactive.slug))
