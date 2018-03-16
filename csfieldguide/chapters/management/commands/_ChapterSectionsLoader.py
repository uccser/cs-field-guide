"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from utils.errors.KeyNotFoundError import KeyNotFoundError
from chapters.models import ChapterSection
from interactives.models import Interactive


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
        self.required_fields = ["section-number"]

    @transaction.atomic
    def load(self):
        """Load the content for a section.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        for section_slug, section_structure in self.section_structure.items():
            if section_structure is None:  # must be missing the single required field
                raise MissingRequiredFieldError(
                    self.section_structure_file_path,
                    self.required_fields,
                    "Chapter section"
                )

            # Convert the content to HTML
            section_content = self.convert_md_file(
                os.path.join(
                    self.section_path,
                    "{}.md".format(section_slug)
                ),
                self.section_structure_file_path,
            )

            interactives = section_content.required_files["interactives"]
            if interactives:
                for interactive_slug in interactives:
                    try:
                        interactive = Interactive.objects.get(slug=interactive_slug)
                    except ObjectDoesNotExist:
                        raise KeyNotFoundError(
                            self.section_structure_file_path,
                            interactive_slug,
                            "Interactive"
                        )
                    self.chapter.interactives.add(interactive)

            section_number = section_structure.get("section-number", None)
            if isinstance(section_number, int) is False:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "section-number - value '{}' is invalid".format(section_number),
                    "section-number must be an integer value."
                )
            if section_number is None:
                raise MissingRequiredFieldError(
                    self.section_structure_file_path,
                    self.required_fields,
                    "ChapterSection"
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
