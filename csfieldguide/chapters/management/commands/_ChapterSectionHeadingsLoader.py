"""Custom loader for loading chapter section headings."""

from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader


class ChapterSectionHeadingsLoader(TranslatableModelLoader):
    """Custom loader for loading headings for chapter sections."""

    def __init__(self, factory, chapter_section, content_translations, **kwargs):
        """Create the loader for loading chapter section headings.

        Args:
            factory (LoaderFactory): LoaderFactory object for creating loaders.
            chapter_section (ChapterSection): Object of related chapter section model.
            content_translation (dict): Dictionary of content translations.
        """
        super().__init__(**kwargs)
        self.factory = factory
        self.chapter_section = chapter_section
        self.content_translations = content_translations

    @transaction.atomic
    def load(self):
        """Store the headings for a chapter section.

        The function iterates through the headings for each language, and
        for each heading, it creates an heading object in the database.

        This function uses a different approach compared to the standard
        TranslatableModel and TranslatableModelLoader approach, for the following
        reasons:

        - Heading order for a section can be different across languages
          due to translations after initial release of section.
        - Slugs are different across languages.
        - Source of the data coming from VertoResult objects, instead of
          separate files.

        """
        for language, content in self.content_translations.items():
            if content.heading_tree:
                for (i, heading_node) in enumerate(content.heading_tree):
                    self.chapter_section.headings.create(
                        slug=heading_node.title_slug,
                        name=heading_node.title,
                        language=language,
                        number=i,
                    )
