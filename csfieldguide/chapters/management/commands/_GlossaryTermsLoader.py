"""Custom loader for loading glossary terms."""

from os import listdir
from django.db import transaction
from chapters.models import GlossaryTerm
from utils.language_utils import get_default_language
from utils.TranslatableModelLoader import TranslatableModelLoader


class GlossaryTermsLoader(TranslatableModelLoader):
    """Custom loader for loading glossary terms."""

    FILE_EXTENSION = ".md"

    @transaction.atomic
    def load(self):
        """Load the glossary content into the database."""
        glossary_slugs = set()

        for filename in listdir(self.get_localised_dir(get_default_language())):
            if filename.endswith(self.FILE_EXTENSION):
                glossary_slug = filename[:-len(self.FILE_EXTENSION)]
                glossary_slugs.add(glossary_slug)

        for glossary_slug in sorted(glossary_slugs):
            term_translations = self.get_blank_translation_dictionary()

            content_filename = "{}.md".format(glossary_slug)
            content_translations = self.get_markdown_translations(content_filename)

            for language, content in content_translations.items():
                term_translations[language]["definition"] = content.html_string
                term_translations[language]["term"] = content.title

            glossary_term = GlossaryTerm(
                slug=glossary_slug,
            )
            self.populate_translations(glossary_term, term_translations)
            self.mark_translation_availability(glossary_term, required_fields=["term", "definition"])
            glossary_term.save()

            self.log("Added glossary term: {}".format(glossary_term.__str__()))

        self.log("{} glossary terms loaded!\n".format(len(glossary_slugs)))
