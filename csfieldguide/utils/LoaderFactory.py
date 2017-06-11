"""Factory for creating loader objects."""

from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader

class LoaderFactory:
    """Factory for creating loader objects."""

    def create_chapter_loader(self, structure_file_path, chapter, BASE_PATH):
        """Create chapter loader."""
        return ChapterLoader(structure_file_path, chapter, BASE_PATH)

    def create_glossary_terms_loader(self, structure_file_path, glossary_folder_path, BASE_PATH):
        """Create glossary terms loader."""
        return GlossaryTermsLoader(structure_file_path, glossary_folder_path, BASE_PATH)
