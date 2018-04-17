"""Module for the custom Django loadgeneralpages command."""

import os.path
from django.core.management.base import BaseCommand
from django.conf import settings
from utils.LoaderFactory import LoaderFactory


class Command(BaseCommand):
    """Required command class for the custom Django loadgeneralpages command.

    Raises:
        MissingRequiredFieldError: When a YAML file is missing a required field.
    """

    help = "Converts Markdown files listed in general application structure files"

    def handle(self, *args, **options):
        """Automatically called when the loadgeneralpages command is given."""
        base_path = settings.GENERAL_PAGES_CONTENT_BASE_PATH
        general_pages_structure_file = "general-pages.yaml"
        factory = LoaderFactory()
        loader = factory.create_general_pages_loader(
            structure_filename=general_pages_structure_file,
            base_path=base_path
        )

        loader.load()
        loader.log("")
