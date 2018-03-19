"""Factory for creating loader objects."""

from chapters.management.commands._ChaptersLoader import ChaptersLoader
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader
from interactives.management.commands._InteractivesLoader import InteractivesLoader


class LoaderFactory:
    """Factory for creating loader objects."""

    def create_chapter_loader(self, **kwargs):
        """Create chapter loader."""
        return ChaptersLoader(**kwargs)

    def create_chapter_section_loader(self, **kwargs):
        """Create chapter loader."""
        return ChapterSectionsLoader(**kwargs)

    def create_interactives_loader(self, **kwargs):
        """Create interactive loader."""
        return InteractivesLoader(**kwargs)

    def create_glossary_terms_loader(self, **kwargs):
        """Create glossary terms loader."""
        return GlossaryTermsLoader(**kwargs)
