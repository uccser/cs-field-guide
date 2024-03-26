"""Create test data for appendix tests."""

import os
from appendices.models import Appendix


class AppendicesTestDataGenerator:
    """Class for generating test data for Appendix."""

    def __init__(self):
        """Create ChaptersTestDataGenerator object."""
        self.BASE_PATH = "tests/appendices/"
        self.LOADER_ASSET_PATH = os.path.join(self.BASE_PATH, "loaders/assets/")

    def create_appendix(self, number, template_str=None):
        """Create appendix object.

        Args:
            number (int): Identifier of the appendix.
            template_str (str): String to use as appendix's template.

        Returns:
            Appendix object.
        """
        template = "appendix-{}.html".format(number)
        if template_str is not None:
            template = template_str
        appendix = Appendix(
            slug="appendix-{}".format(number),
            name="Appendix {}".format(number),
            template=template,
            languages=["en"],
        )
        appendix.save()
        return appendix
