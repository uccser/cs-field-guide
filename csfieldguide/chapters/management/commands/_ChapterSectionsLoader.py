"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from chapters.models import ChapterSection


class ChapterSectionsLoader(BaseLoader):
    """Custom loader for loading chapter sections."""

    def __init__(self, chapter, chapter_path, section_structure_file_path):
        """Create the loader for loading a ChapterSection.

        Args:
            chapter (Chapter): Chapter object to attach section to.
            chapter_path (str): Path to chapter's files
            section_stucture_file_path (str): Path to sections structure file.
        """
        super().__init__()
        self.chapter = chapter
        self.section_path = os.path.join(chapter_path, "sections")
        self.section_structure_file_path = section_structure_file_path
        self.section_structure = self.load_yaml_file(self.section_structure_file_path)

    @transaction.atomic
    def load(self):
        """Load the content for a section.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        for section_slug, section_structure in self.section_structure.items():
            # Convert the content to HTML
            section_content = self.convert_md_file(
                os.path.join(
                    self.section_path,
                    "{}.md".format(section_slug)
                ),
                self.section_structure_file_path,
            )

            section_number = section_structure.get("section-number", None)
            if section_number is None:
                raise MissingRequiredFieldError(
                    self.section_structure_file_path,
                    ["section-number"],
                    "Chapter section"
                )

            # Create ChapterSection object and save to the db
            chapter_section = ChapterSection(
                slug=section_slug,
                heading=section_content.title,
                number=section_number,
                content=section_content.html_string,
                chapter=self.chapter
            )
            chapter_section.save()

            self.log("Added Chapter Section: {}".format(chapter_section.heading), 1)
