"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.KeyNotFoundError import KeyNotFoundError
from chapters.models import Chapter
from interactives.models import Interactive


class ChaptersLoader(TranslatableModelLoader):
    """Custom loader for loading chapters."""

    def __init__(self, factory, **kwargs):
        """Create the loader for loading a Chapter.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
        """
        super().__init__(BASE_PATH)
        self.factory = factory
        self.chapter_slug = self.content_path
        self.chapter_number = chapter_number

    @transaction.atomic
    def load(self):
        """Load the content for a chapter.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        chapter_structure = self.load_yaml_file(self.structure_file_path)

        sections = chapter_structure.get("sections", None)
        if sections is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["sections"],
                "Chapter"
            )

        chapter_translations = self.get_blank_translation_dictionary()

        introduction_filename = "{}.md".format(self.topic_slug)
        introduction_translations = self.get_markdown_translations(introduction_filename)
        for language, content in introduction_translations.items():
            chapter_translations[language]["introduction"] = content.html_string
            chapter_translations[language]["name"] = content.title

        chapter_icon = chapter_structure.get("icon", None)
        if chapter_icon is None:
            raise MissingRequiredFieldError(
                self.chapter_structure_file_path,
                self.required_fields,
                "Chapter"
            )

        # Create chapter object and save to the db
        chapter = Chapter(
            slug=self.chapter_slug,
            number=self.chapter_number,
            icon=chapter_icon
        )

        self.populate_translations(chapter, chapter_translations)
        self.mark_translation_availability(chapter, required_fields=["name", "introduction"])
        chapter.save()

        self.log("Added chapter: {}".format(chapter.name))

        interactives = introduction_translations[get_default_language()].required_files["interactives"]
        for interactive_slug in interactives:
            try:
                interactive = Interactive.objects.get(slug=interactive_slug)
            except ObjectDoesNotExist:
                raise KeyNotFoundError(
                    self.chapter_structure_file_path,
                    interactive_slug,
                    "Interactive"
                )
            chapter.interactives.add(interactive)

        # Load chapter sections
        for section_file_path in sections:
            content_path, structure_filename = os.path.split(section_file_path)
            self.factory.create_chapter_section_loader(
                chapter,
                base_path=self.base_path,
                content_path=os.path.join(self.content_path, content_path),
                structure_filename=structure_filename
            ).load()
