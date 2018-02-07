"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from chapters.models import ChapterSection


class ChapterSectionLoader(BaseLoader):
    """Custom loader for loading chapter sections."""

    def __init__(self, structure_file_path, chapter, section_slug, section_structure, BASE_PATH):
        """Create the loader for loading a chapter section.

        Args:
            structure_file_path (str): path to application structure file.
            chapter (str): key for chapter to load.
            chapter_stucture (dict): Attributes for the chapter (e.g. chapter number).
            BASE_PATH (str): Base file path.
        """
        super().__init__(BASE_PATH)
        self.structure_file_path = structure_file_path
        self.section_slug = section_slug
        self.section_structure = section_structure
        self.BASE_PATH = BASE_PATH

    @transaction.atomic
    def load(self):
        """Load the content for a section.

        Raise:
            MissingRequiredFieldError: when no object can be found with the matching attribute.
        """
        # Convert the content to HTML
        section_content = self.convert_md_file(
            os.path.join(
                self.BASE_PATH,
                "{}.md".format(self.section_slug)
            ),
            self.structure_file_path
        )

        section_number = self.section_structure.get("number", None)
        if section_number is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["number"],
                "Section Number"
            )

        # Create ChapterSection object and save to the db
        chapter_section = ChapterSection(
            slug=self.section_slug,
            heading=section_content.title,
            number=section_number,
            content=section_content.html_string,
            chapter=chapter
        )
        chapter_section.save()

        self.log("Added Chapter Section: {}".format(chapter_section.heading))

        self.log("")
