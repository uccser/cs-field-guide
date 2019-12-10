"""Create test data for interactive tests."""

from interactives.models import Interactive


class InteractivesTestDataGenerator:
    """Class for generating test data for interactives."""

    def create_interactive(self, number):
        """Create interactive object.

        Args:
            number (int): Identifier of the interactive.

        Returns:
            Interactive object.
        """
        interactive = Interactive(
            slug="interactive-{}".format(number),
            name="Interactive {}".format(number),
            template="interactive-{}.html".format(number),
            languages=["en"],
        )
        interactive.save()
        return interactive
    
    def create_interactive_with_large_thumbnail(self, number):
        """Create interactive object set to use a large thumbnail.

        Args:
            number (int): Identifier of the interactive.

        Returns:
            Interactive object.
        """
        interactive = Interactive(
            slug="interactive-{}".format(number),
            name="Interactive {}".format(number),
            template="interactive-{}.html".format(number),
            languages=["en"],
            use_large_thumbnail=True,
        )
        interactive.save()
        return interactive
    
    def create_uninteractive(self, number):
        """Create interactive object that is an uninteractive.

        Args:
            number (int): Identifier of the uninteractive.

        Returns:
            Interactive object.
        """
        uninteractive = Interactive(
            slug="interactive-{}".format(number),
            name="Interactive {}".format(number),
            template="interactive-{}.html".format(number),
            languages=["en"],
            is_interactive=False,
        )
        uninteractive.save()
        return uninteractive
