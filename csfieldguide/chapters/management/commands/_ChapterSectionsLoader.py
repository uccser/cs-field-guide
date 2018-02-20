"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from chapters.models import ChapterSection


class ChapterSectionsLoader(BaseLoader):
    """Custom loader for loading chapter sections."""

    def __init__(self, chapter, section_structure_file_path):
        """Create the loader for loading a ChapterSection.

        Args:
            chapter (Chapter): Chapter object to attach section to.
            section_stucture (dict): Attributes for the chapter section (e.g. section number).
            BASE_PATH (str): Base file path.
        """
        super().__init__()
        self.chapter = chapter
        self.section_structure_file_path = section_structure_file_path

    @transaction.atomic
    def load(self):
        """Load the content for a section.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        print(self.chapter, self.section_structure_file_path)
        # Convert the content to HTML
        section_content = self.convert_md_file(
            os.path.join(
                self.BASE_PATH,
                "{}.md".format(self.section_slug)
            ),
            self.structure_file_path,
        )

        section_number = self.section_structure.get("section-number", None)
        if section_number is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["section-number"],
                "Chapter section"
            )

        # Create ChapterSection object and save to the db
        chapter_section = ChapterSection(
            slug=self.section_slug,
            heading=section_content.title,
            number=section_number,
            content=section_content.html_string,
            chapter=self.chapter
        )
        chapter_section.save()

        self.log("Added Chapter Section: {}".format(chapter_section.heading))

        self.log("")
