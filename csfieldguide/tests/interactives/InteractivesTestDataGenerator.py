"""Create test data for interactive tests."""

from interactives.models import Interactive


class InteractivesTestDataGenerator:
    """Class for generating test data for interactives."""

    def __init__(self):
        """Create InteractivesTestDataGenerator object."""
        self.LOADER_ASSET_PATH = "tests/chapters/loaders/assets/interactives/"

    def create_interactive(self, number):
        """Create interactive object.

        Args:
            number (int): Identifier of the interactive.

        Returns:
            Interactive object.
        """
        interactive = Interactive(
            slug="interactive-{}".format(number),
            name="Interacive {}".format(number),
            template="interactive-{}-template".format(number)
        )
        interactive.save()
        return interactive
