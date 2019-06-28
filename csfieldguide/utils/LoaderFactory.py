"""Factory for creating loader objects."""

from appendices.management.commands._AppendicesLoader import AppendicesLoader
from chapters.management.commands._ChaptersLoader import ChaptersLoader
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.management.commands._ChapterSectionHeadingsLoader import ChapterSectionHeadingsLoader
from chapters.management.commands._GlossaryTermsLoader import GlossaryTermsLoader
from curriculum_guides.management.commands._CurriculumGuidesLoader import CurriculumGuidesLoader
from curriculum_guides.management.commands._CurriculumGuideSectionsLoader import CurriculumGuideSectionsLoader
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
        """Create chapter section loader."""
        return ChapterSectionsLoader(self, chapter, **kwargs)

    def create_chapter_section_heading_loader(self, chapter_section, content_translations, **kwargs):
        """Create chapter section heading loader."""
        return ChapterSectionHeadingsLoader(self, chapter_section, content_translations, **kwargs)

    def create_curriculum_guide_loader(self, **kwargs):
        """Create curriculum guide loader."""
        return CurriculumGuidesLoader(self, **kwargs)

    def create_curriculum_guide_section_loader(self, curriculum_guide, **kwargs):
        """Create curriculum guide loader."""
        return CurriculumGuideSectionsLoader(self, curriculum_guide, **kwargs)

    def create_interactives_loader(self, **kwargs):
        """Create interactive loader."""
        return InteractivesLoader(**kwargs)

    def create_glossary_terms_loader(self, **kwargs):
        """Create glossary terms loader."""
        return GlossaryTermsLoader(**kwargs)
