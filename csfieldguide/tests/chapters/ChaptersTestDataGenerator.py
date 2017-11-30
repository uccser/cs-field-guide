"""Create test data for chapter tests."""

import os.path
import yaml

from chapters.models import Chapter


class ChaptersTestDataGenerator:
    """Class for generating test data for topics."""

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

    def create_chapter(self, number):
        """Create chapter object.

        Args:
            number: Identifier of the chapter (int).

        Returns:
            Chapter object.
        """
        chapter = Chapter(
            slug="chapter-{}".format(number),
            name="Chapter {}".format(number),
            content="<p>Content for chapter {}.</p>".format(number)
        )
        chapter.save()
        return chapter
