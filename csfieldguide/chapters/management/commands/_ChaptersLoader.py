"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from chapters.models import Chapter
from interactives.models import Interactive


class ChaptersLoader(BaseLoader):
    """Custom loader for loading chapters."""

    def __init__(self, factory, chapter_structure_file_path, chapter_slug, chapter_number, BASE_PATH):
        """Create the loader for loading a Chapter.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
            chapter_structure_file_path (str): Path to chapter structure file.
            chapter_slug (str): Key for chapter to load.
            chapter_number (int): Chapter number relative to other chapters.
            BASE_PATH (str): Base file path.
        """
        super().__init__(BASE_PATH)
        self.factory = factory
        self.chapter_structure_file_path = chapter_structure_file_path
        self.chapter_structure = self.load_yaml_file(self.chapter_structure_file_path)
        self.chapter_slug = chapter_slug
        self.chapter_number = chapter_number
        self.chapter_path = os.path.join(BASE_PATH, self.chapter_slug)
        self.required_fields = ["sections", "icon"],

    @transaction.atomic
    def load(self):
        """Load the content for a chapter.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        chapter_introduction = self.convert_md_file(
            os.path.join(
                self.chapter_path,
                "{}.md".format(self.chapter_slug)
            ),
            self.chapter_structure_file_path,
        )

        chapter_icon = self.chapter_structure.get("icon", None)
        if chapter_icon is None:
            raise MissingRequiredFieldError(
                self.chapter_structure_file_path,
                self.required_fields,
                "Chapter"
            )

        # Create chapter object and save to the db
        chapter = Chapter(
            slug=self.chapter_slug,
            name=chapter_introduction.title,
            number=self.chapter_number,
            introduction=chapter_introduction.html_string,
            icon=chapter_icon
        )
        chapter.save()

        self.log("Added Chapter: {}".format(chapter.name))

        chapter_interactives = chapter_introduction.required_files["interactives"]
        if chapter_interactives:
            for interactive_slug in chapter_interactives:
                try:
                    interactive = Interactive.objects.get(slug=interactive_slug)
                except ObjectDoesNotExist:
                    raise KeyNotFoundError(
                        self.structure_file_path,
                        interactive_slug,
                        "Interactive"
                    )
                chapter.interactives.add(interactive)

        sections_yaml = self.chapter_structure.get("sections", None)
        if sections_yaml is None:
            raise MissingRequiredFieldError(
                self.chapter_structure_file_path,
                self.required_fields,
                "Chapter"
            )

        sections_structure_file_path = os.path.join(
            self.chapter_path,
            sections_yaml,
        )
        self.factory.create_chapter_section_loader(
            chapter,
            self.chapter_path,
            sections_structure_file_path,
        ).load()
