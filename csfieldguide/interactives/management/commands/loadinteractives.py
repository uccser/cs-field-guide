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


        factory.create_interactives_loader(
            base_path=base_path,
            content_path="",
            structure_filename="interactives.yaml"
        ).load()
