"""Module for the custom Django loadinteractives command."""

import os.path
from django.core.management.base import BaseCommand


from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError

from .models import Interactive


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
        new_interactive = Interactive(
            slug="sorting-algorithms",
            template="chapters/interactives/sorting-algorithms.html"
        )
        new_interactive.save()
