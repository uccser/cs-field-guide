"""Create test data for chapter tests."""

import os.path
import yaml

from chapters.models import (
    Chapter,
    ChapterSection,
    GlossaryTerm,
)


class ChaptersTestDataGenerator:
    """Class for generating test data for chapters."""

    def __init__(self):
        """Create ChaptersTestDataGenerator object."""
        self.BASE_PATH = "tests/chapters/"
        self.LOADER_ASSET_PATH = os.path.join(self.BASE_PATH, "loaders/assets/")

    def load_yaml_file(self, yaml_file_path):
        """Load a yaml file.

        Args:
            yaml_file_path:  The path to a given yaml file (str).

        Returns:
            Contents of a yaml file.
        """
        yaml_file = open(yaml_file_path, encoding="UTF-8").read()
        return yaml.load(yaml_file)

    def create_chapter(self, number, introduction=None):
        """Create Chapter object.

        Args:
            number: Identifier of the chapter (int).

        Returns:
            Chapter object.
        """
        if not introduction:
            introduction = "<p>Introduction for chapter {}</p>".format(number)
        chapter = Chapter(
            slug="chapter-{}".format(number),
            name="Chapter {}".format(number),
            number=number,
            introduction=introduction,
        )
        chapter.save()
        return chapter

    def create_chapter_section(self, chapter, number):
        """Create ChapterSection object.

        Args:
            number: Identifier of the chapter section (int).

        Returns:
            ChapterSection object.
        """
        chapter_section = ChapterSection(
            slug="section-{}".format(number),
            name="Section {}".format(number),
            number=number,
            content="<p>Content for section {}.</p>".format(number),
            chapter=chapter
        )
        chapter_section.save()
        return chapter_section

    def create_glossary_term(self, number):
        """Create GlossaryTerm object.

        Args:
            number: Identifier of the glossary term (int).

        Returns:
            GlossaryTerm object.
        """
        glossary_term = GlossaryTerm(
            slug="glossary-term-{}".format(number),
            term="Glossary Term {}".format(number),
            definition="<p>Definition for glossary term {}.</p>".format(number),
        )
        glossary_term.save()
        return glossary_term
