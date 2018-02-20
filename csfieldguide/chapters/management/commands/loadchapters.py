"""Module for the custom Django loadchapters command."""

import os.path
from django.core.management.base import BaseCommand

from utils.BaseLoader import BaseLoader
from utils.LoaderFactory import LoaderFactory

from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


class Command(BaseCommand):
    """Required command class for the custom Django loadchapters command.

    Raises:
        MissingRequiredFieldError: when a config (yaml) file is missing a required
            field.
    """

    help = "Converts Markdown files listed in structure file and stores"

    def handle(self, *args, **options):
        """Automatically called when the loadchapters command is given."""
        factory = LoaderFactory()
        # Get structure and content files
        base_loader = BaseLoader()
        BASE_PATH = "chapters/content/en/"

        structure_file_path = os.path.join(
            BASE_PATH,
            "structure.yaml"
        )

        structure_file = base_loader.load_yaml_file(structure_file_path)

        if "glossary-folder" in structure_file:
            glossary_directory_name = structure_file["glossary-folder"]
            if glossary_directory_name is not None:
                factory.create_glossary_terms_loader(
                    structure_file_path=structure_file_path,
                    glossary_directory_name=glossary_directory_name,
                    BASE_PATH=BASE_PATH
                ).load()

        chapters = structure_file.get("chapters", None)
        if chapters is None:
            raise MissingRequiredFieldError(
                structure_file_path,
                ["chapters"],
                "Application Structure"
            )
        else:
            for chapter_slug in chapters:
                chapter_structure_file_path = os.path.join(
                    BASE_PATH,
                    "{}/{}.yaml".format(chapter_slug, chapter_slug)
                )
                chapter_number = chapters[chapter_slug]["chapter-number"]
                # TODO check chapter_number is int
                factory.create_chapter_loader(
                    chapter_structure_file_path,
                    chapter_slug,
                    chapter_number,
                    BASE_PATH
                ).load()
