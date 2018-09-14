"""Module for the custom Django makeinteractivethumbnails command."""

import os
import os.path
from urllib.parse import urlencode
from django.conf import settings
from django.core.management.base import BaseCommand
from django.http.request import QueryDict
from django.utils import translation
from interactives.models import Interactive
from interactives.utils.get_thumbnail import (
    get_thumbnail_filename,
    get_thumbnail_base,
    save_thumbnail,
)

BASE_PATH_TEMPLATE = "build/img/interactives/{interactive}/thumbnails/{language}"


class Command(BaseCommand):
    """Required command class for the custom Django makeinteractivethumbnails command."""

    help = "Creates thumbnail images of interactive combinations."

    def add_arguments(self, parser):
        """Add optional parameter to makeinteractivethumbnails command."""
        parser.add_argument(
            "--all-languages",
            action="store_true",
            dest="all_languages",
            help="Generate thumbnails for all languages",
        )

    def handle(self, *args, **options):
        """Automatically called when makeinteractivethumbnails command is given."""
        interactives = Interactive.objects.order_by("name")

        if options.get("all_languages"):
            languages = settings.DEFAULT_LANGUAGES
        else:
            languages = [("en", "")]
        for language_code, _ in languages:
            with translation.override(language_code):
                print("Creating thumbnails for language '{}'".format(language_code))
                base_path = get_thumbnail_base()
                if not os.path.exists(base_path):
                    os.makedirs(base_path)

                for interactive in interactives:
                    save_thumbnail(interactive)
                    print("- Created thumbnails for {}".format(interactive.name))
