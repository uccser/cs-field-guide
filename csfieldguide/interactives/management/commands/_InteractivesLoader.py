"""Custom loader for loading interactives."""

from django.db import transaction
from interactives.models import Interactive
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


class InteractivesLoader(BaseLoader):
    """Custom loader for loading interactives."""

    def __init__(self, structure_file_path, interactive_slug, interactive_structure, BASE_PATH):
        """Create the loader for loading an interactive.

        Args:
            structure_file_path (str): path to application structure file.
            interactive_slug (str): Key for interactive to load.
            interactive_structure (dict): Attributes for the interactive.
            BASE_PATH (str): Base file path.
        """
        super().__init__(BASE_PATH)
        self.structure_file_path = structure_file_path
        self.interactive_slug = interactive_slug
        self.interactive_structure = interactive_structure
        self.BASE_PATH = BASE_PATH

    @transaction.atomic
    def load(self):
        """Load the paths to interactive templates.

        MissingRequiredFieldError: When a config (yaml) file is missing a
            required field.
        """
        interactive_name = self.interactive_structure.get("name", None)
        if interactive_name is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["name"],
                "Interactive"
            )

        # Create interactive object and save to the db
        new_interactive = Interactive(
            slug=self.interactive_slug,
            name=interactive_name,
            template="interactives/{}.html".format(self.interactive_slug)
        )
        new_interactive.save()

        self.log("Added interactive: {}".format(new_interactive.name))
