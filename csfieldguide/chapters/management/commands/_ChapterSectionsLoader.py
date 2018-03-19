"""Custom loader for loading a topic."""

import os.path
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from utils.errors.KeyNotFoundError import KeyNotFoundError
from utils.language_utils import get_default_language
from chapters.models import ChapterSection
from interactives.models import Interactive


class ChapterSectionsLoader(TranslatableModelLoader):
    """Custom loader for loading chapter sections."""

    def __init__(self, factory, chapter, **kwargs):
        """Create the loader for loading chapter sections.

        Args:
            factory: LoaderFactory object for creating loaders (LoaderFactory).
            chapter: Object of related chapter model (Chapter).
        """
        super().__init__(**kwargs)
        self.factory = factory
        self.chapter_section_slug = os.path.splitext(self.structure_filename)[0]
        self.chapter = chapter
        # self.required_fields = ["section-number"]

    def load(self):
        """Load the content for a section.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        chapter_sections_structure = self.load_yaml_file(self.structure_file_path)

        for (section_slug, section_structure) in chapter_sections_structure.items():

            if section_structure is None:
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    ["section-number"],
                    "ChapterSection"
                )

            section_number = section_structure.get("section-number", None)
            if section_number is None:
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    self.required_fields,
                    "ChapterSection"
                )
            if isinstance(section_number, int) is False:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "section-number - value '{}' is invalid".format(section_number),
                    "section-number must be an integer value."
                )

            chapter_section_translations = self.get_blank_translation_dictionary()

            content_filename = "{}.md".format(self.chapter_section_slug)
            content_translations = self.get_markdown_translations(content_filename)
            for language, content in content_translations.items():
                chapter_section_translations[language]["content"] = content.html_string
                chapter_section_translations[language]["name"] = content.title

            chapter_section = self.chapter.chapter_sections.create(
                slug=self.chapter_section_slug,
                chapter=self.chapter,
                number=section_number,
                languages=list(content_translations.keys()),
            )

            self.populate_translations(chapter_section, chapter_section_translations)
            self.mark_translation_availability(chapter_section, required_fields=["name", "content"])

            chapter_section.save()

            self.log("Added chapter section: {}".format(chapter_section.name), 1)

            interactives = content_translations[get_default_language()].required_files["interactives"]
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
