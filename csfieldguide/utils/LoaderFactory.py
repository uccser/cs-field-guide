"""Factory for creating loader objects."""

from chapters.management.commands._ChapterLoader import ChapterLoader
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader
from interactives.management.commands._InteractivesLoader import InteractivesLoader


class LoaderFactory:
    """Factory for creating loader objects."""

    def create_chapter_loader(self, structure_file_path, chapter_slug, chapter_structure, BASE_PATH):
        """Create chapter loader."""
        return ChapterLoader(structure_file_path, chapter_slug, chapter_structure, BASE_PATH)

    def create_interactives_loader(self, structure_file_path, interactive_slug, interactive_structure, BASE_PATH):
        """Create interactive loader."""
        return InteractivesLoader(structure_file_path, interactive_slug, interactive_structure, BASE_PATH)

    def create_glossary_terms_loader(self, structure_file_path, glossary_directory_name, BASE_PATH):
        """Create glossary terms loader."""
        return GlossaryTermsLoader(structure_file_path, glossary_directory_name, BASE_PATH)
