"""Custom loader for loading interactives."""

from django.db import transaction
from interactives.models import Interactive
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError


class InteractivesLoader(TranslatableModelLoader):
    """Custom loader for loading interactives."""

    @transaction.atomic
    def load(self):
        """Load the paths to interactive templates.

        MissingRequiredFieldError: When a config (yaml) file is missing a
            required field.
        """
        interactives_structure = self.load_yaml_file(self.structure_file_path)
        interactives = interactives_structure.get("interactives", None)
        if interactives is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["interactives"],
                "Interactive"
            )

        interactive_translations = self.get_yaml_translations(
            self.structure_filename,
            required_slugs=interactives,
            required_fields=["name"]
        )

        for interactive_slug in interactives:
            translations = interactive_translations.get(interactive_slug, dict())
            interactive = Interactive(
                slug=interactive_slug,
                template="interactives/{}.html".format(interactive_slug)
            )
            self.populate_translations(interactive, translations)
            self.mark_translation_availability(interactive, required_fields=["name"])
            interactive.save()

            self.log("Added interactive: {}".format(interactive.__str__()))
