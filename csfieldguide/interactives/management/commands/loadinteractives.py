"""Module for the custom Django loadinteractives command."""

from django.conf import settings
from django.core.management.base import BaseCommand
from utils.LoaderFactory import LoaderFactory


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
        base_path = settings.INTERACTIVES_CONTENT_BASE_PATH
        loader = factory.create_interactives_loader(
            base_path=base_path,
            content_path="",
            structure_filename="interactives.yaml"
        )

        loader.load()

        loader.log("All interactives loaded!")
        loader.log("")
