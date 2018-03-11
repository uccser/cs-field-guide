"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from utils.BaseLoader import BaseLoader
from utils.check_required_files import find_image_files
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from chapters.models import Chapter


class ChapterLoader(BaseLoader):
    """Custom loader for loading chapters."""

    def __init__(self, structure_file_path, chapter_slug, chapter_structure, BASE_PATH):
        """Create the loader for loading a topic.

        Args:
            structure_file_path (str): path to application structure file.
            chapter (str): key for chapter to load.
            chapter_stucture (dict): Attributes for the chapter (e.g. chapter number).
            BASE_PATH (str): Base file path.
        """
        super().__init__(BASE_PATH)
        self.structure_file_path = structure_file_path
        self.chapter_slug = chapter_slug
        self.chapter_structure = chapter_structure
        self.BASE_PATH = os.path.join(BASE_PATH, "chapters")

    @transaction.atomic
    def load(self):
        """Load the content for a chapter.

        Raise:
            MissingRequiredFieldError: when no object can be found with the matching attribute.
        """
        # Convert the content to HTML
        chapter_content = self.convert_md_file(
            os.path.join(
                self.BASE_PATH,
                "{}.md".format(self.chapter_slug)
            ),
            self.structure_file_path
        )

        chapter_number = self.chapter_structure.get("number", None)
        if chapter_number is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["number"],
                "Chapter Number"
            )

        chapter_icon = self.chapter_structure.get('icon', None)
        if chapter_icon is not None:
            find_image_files([chapter_icon], self.structure_file_path)


        # Create chapter object and save to the db
        chapter = Chapter(
            slug=self.chapter_slug,
            name=chapter_content.title,
            number=chapter_number,
            content=chapter_content.html_string,
            other_resources=None,
            icon=chapter_icon
        )
        chapter.save()

        self.log("Added Chapter: {}".format(chapter.name))

        self.log("")
