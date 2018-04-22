"""Factory for creating loader objects."""

from appendices.management.commands._AppendicesLoader import AppendicesLoader
from chapters.management.commands._ChaptersLoader import ChaptersLoader
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader
from interactives.management.commands._InteractivesLoader import InteractivesLoader


class LoaderFactory:
    """Factory for creating loader objects."""

    def create_appendices_loader(self, **kwargs):
        """Create appendices pages loader."""
        return AppendicesLoader(self, **kwargs)

    def create_chapter_loader(self, **kwargs):
        """Create chapter loader."""
        return ChaptersLoader(self, **kwargs)

    def create_chapter_section_loader(self, chapter, **kwargs):
        """Create chapter loader."""
        return ChapterSectionsLoader(self, chapter, **kwargs)

    def create_interactives_loader(self, **kwargs):
        """Create interactive loader."""
        return InteractivesLoader(**kwargs)

    def create_glossary_terms_loader(self, **kwargs):
        """Create glossary terms loader."""
        return GlossaryTermsLoader(**kwargs)
