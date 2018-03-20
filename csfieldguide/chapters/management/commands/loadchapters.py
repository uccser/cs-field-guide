"""Module for the custom Django loadchapters command."""

import os.path
from django.core.management.base import BaseCommand
from django.conf import settings
from utils.BaseLoader import BaseLoader
from utils.LoaderFactory import LoaderFactory
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError


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
        base_path = settings.CHAPTERS_CONTENT_BASE_PATH

        structure_file_path = os.path.join(
            base_path,
            base_loader.structure_dir,
            "structure.yaml"
        )

        structure_file = base_loader.load_yaml_file(structure_file_path)

        if "glossary-folder" in structure_file:
            glossary_directory = structure_file["glossary-folder"]
            if glossary_directory is not None:
                factory.create_glossary_terms_loader(
                    base_path=base_path,
                    content_path=glossary_directory,
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
                chapter_structure_file = "{}.yaml".format(chapter_slug)

                chapter_number = chapters[chapter_slug].get("chapter-number", None)
                if chapter_number is None:
                    raise MissingRequiredFieldError(
                        structure_file_path,
                        ["chapter_number"],
                        "Application Structure for Chapter {}".format(chapter_slug)
                    )
                if isinstance(chapter_number, int) is False:
                    raise InvalidYAMLValueError(
                        structure_file_path,
                        "chapter-number - value '{}' is invalid".format(chapter_number),
                        "chapter-number must be an integer value."
                    )
                factory.create_chapter_loader(
                    base_path=base_path,
                    content_path=chapter_slug,
                    chapter_number=chapter_number,
                    structure_filename=chapter_structure_file,
                ).load()

            base_loader.log("All chapters loaded!")
            base_loader.log("")
