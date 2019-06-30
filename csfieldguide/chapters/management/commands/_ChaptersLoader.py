"""Custom loader for loading a chapter."""

import os.path
from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.language_utils import get_default_language
from utils.check_required_files import check_interactives
from chapters.models import Chapter


class ChaptersLoader(TranslatableModelLoader):
    """Custom loader for loading chapters."""

    extra_converter_templates_directory = "chapter"

    def __init__(self, factory, chapter_number, **kwargs):
        """Create the loader for loading a Chapter.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
        """
        super().__init__(**kwargs)
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

        introduction_filename = "{}.md".format(self.chapter_slug)
        introduction_translations = self.get_markdown_translations(introduction_filename)
        for language, content in introduction_translations.items():
            chapter_translations[language]["introduction"] = content.html_string
            chapter_translations[language]["name"] = content.title

        chapter_icon = chapter_structure.get("icon", None)
        if chapter_icon is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["icon"],
                "Chapter"
            )
        else:
            # TODO: Check icon exists here before path modification
            # Remove directory and extension as svg templatetag automatically adds these
            chapter_icon = chapter_icon[4:-4]

        video = chapter_structure.get("video", "")
        if video != "" and "vimeo" not in video:
            raise ValueError("Video must be a Vimeo video.")

        # Create chapter object and save to the db
        chapter = Chapter(
            slug=self.chapter_slug,
            number=self.chapter_number,
            icon=chapter_icon,
            video=video
        )

        self.populate_translations(chapter, chapter_translations)
        self.mark_translation_availability(chapter, required_fields=["name", "introduction"])
        chapter.save()

        self.log("Added chapter: {}".format(chapter.name))

        check_interactives(
            introduction_translations[get_default_language()].required_files["interactives"],
            self.structure_file_path,
            chapter,
        )

        # Load chapter sections
        content_path, structure_filename = os.path.split(sections)
        self.factory.create_chapter_section_loader(
            chapter,
            base_path=self.base_path,
            content_path=os.path.join(self.content_path, content_path),
            structure_filename=structure_filename
        ).load()
