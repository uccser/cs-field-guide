"""Factory for creating loader objects."""

from chapters.management.commands._ChapterLoader import ChapterLoader

class LoaderFactory:
    """Factory for creating loader objects."""

    def create_chapter_loader(self, structure_file_path, chapter, BASE_PATH):
        """Create chapter loader."""
        return ChapterLoader(structure_file_path, chapter, BASE_PATH)