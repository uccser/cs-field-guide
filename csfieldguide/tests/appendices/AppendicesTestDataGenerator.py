"""Create test data for appendices tests."""

import os.path

from appendices.models import (
    Appendix,
    Subappendix,
)


class AppendicesTestDataGenerator:
    """Class for generating test data for appendices."""

    def __init__(self):
        """Create AppendixTestDataGenerator object."""
        self.BASE_PATH = "tests/appendices/"
        self.LOADER_ASSET_PATH = os.path.join(self.BASE_PATH, "loaders/assets/")

    def create_appendix(self, number, template=None):
        """Create Appendix object.

        Args:
            number (int): Identifier of the appendix.
            template (str): Path of template file.

        Returns:
            Appendix object.
        """
        appendix = Appendix(
            slug="appendix-{}".format(number),
            name="appendix {}".format(number),
            template=template,
        )
        appendix.save()
        return appendix

    def create_subappendix(self, appendix, number, template=None):
        """Create Subappendix object.

        Args:
            number (int): Identifier of the subappendix.
            template (str): Path of template file.

        Returns:
            Subappendix object.
        """
        subappendix = Subappendix(
            slug="subappendix-{}".format(number),
            name="subappendix {}".format(number),
            template=template,
            appendix=appendix
        )
        subappendix.save()
        return subappendix
