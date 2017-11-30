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
            glossary_folder_path: Folder path to definition files (string).
            structure_file_path: Path to the config file, used for errors.
            BASE_PATH: Base file path (string).
        """
        super().__init__(BASE_PATH)
        print(self.BASE_PATH, glossary_directory_name)
        self.structure_file_path = structure_file_path
        self.glossary_folder_path = os.path.join(self.BASE_PATH, glossary_directory_name)
        self.FILE_EXTENSION = ".md"

    @transaction.atomic
    def load(self):
        """Load the glossary content into the database."""
        # glossary_slugs = set()

        for filename in listdir(self.glossary_folder_path):
            if filename.endswith(self.FILE_EXTENSION):
                glossary_slug = filename.split(".")[0]

                glossary_term_file_path = os.path.join(
                    self.glossary_folder_path,
                    "{}{}".format(glossary_slug, self.FILE_EXTENSION)
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
