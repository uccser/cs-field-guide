"""Module for the custom Django loadappendices command."""

from django.core.management.base import BaseCommand
from django.conf import settings
from utils.LoaderFactory import LoaderFactory


class Command(BaseCommand):
    """Required command class for the custom Django loadappendices command.

    Raises:
        MissingRequiredFieldError: When a YAML file is missing a required field.
    """

    help = "Converts Markdown files listed in appendices application structure files"

    def handle(self, *args, **options):
        """Automatically called when the loadappendices command is given."""
        base_path = settings.APPENDICES_CONTENT_BASE_PATH
        appendices_structure_file = "appendices.yaml"
        factory = LoaderFactory()
        loader = factory.create_appendices_loader(
            structure_filename=appendices_structure_file,
            base_path=base_path
        )

        loader.load()
        loader.log("All appendices loaded!")
        loader.log("")
