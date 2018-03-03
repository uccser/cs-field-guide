"""Custom loader for loading glossary terms."""

import os.path
from os import listdir
from django.db import transaction

from utils.BaseLoader import BaseLoader
from chapters.models import GlossaryTerm


class GlossaryTermsLoader(BaseLoader):
    """Custom loader for loading glossary terms."""

    def __init__(self, structure_file_path, glossary_directory_name, BASE_PATH):
        """Create the loader for loading glossary terms.

        Args:
            structure_file_path (str): Path to the config file, used for errors.
            glossary_directory_name (str): Folder path to definition files.
            BASE_PATH (str): Base file path.
        """
        super().__init__(BASE_PATH)
        self.structure_file_path = structure_file_path
        self.glossary_folder_path = os.path.join(self.BASE_PATH, glossary_directory_name)

    @transaction.atomic
    def load(self):
        """Load the glossary content into the database."""
        for filename in listdir(self.glossary_folder_path):
            if filename.endswith(".md"):
                glossary_slug = filename.split(".")[0]

                glossary_term_file_path = os.path.join(
                    self.glossary_folder_path,
                    "{}{}".format(glossary_slug, ".md")
                )
                glossary_term_content = self.convert_md_file(
                    glossary_term_file_path,
                    self.structure_file_path
                )
                new_glossary_term = GlossaryTerm(
                    slug=glossary_slug,
                    term=glossary_term_content.title,
                    definition=glossary_term_content.html_string
                )
                new_glossary_term.save()

                self.log("Added glossary term: {}".format(new_glossary_term.__str__()))

        self.log("All glossary terms loaded!\n")
