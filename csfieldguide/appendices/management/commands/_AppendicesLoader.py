"""Custom loader for loading appendices."""

from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from appendices.models import Appendix
from django.template.loader import get_template
from django.template import TemplateDoesNotExist


class AppendicesLoader(TranslatableModelLoader):
    """Custom loader for loading appendices pages."""

    def __init__(self, factory, **kwargs):
        """Create the loader for loading appendices.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
        """
        super().__init__(**kwargs)
        self.factory = factory

    @transaction.atomic
    def load(self):
        """Load appendices pages.

        Raise:
            MissingRequiredFieldError: when no object can be found with the matching
                attribute.
        """
        appendices = self.load_yaml_file(self.structure_file_path)
        appendices_translations = self.get_yaml_translations(
            self.structure_filename,
            required_fields=["name"],
            required_slugs=appendices.keys()
        )
        used_numbers = set()

        for (slug, page_data) in appendices.items():
            try:
                template = page_data["template"]
                number = page_data["number"]
            except (TypeError, KeyError):
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    [
                        "template",
                        "number",
                    ],
                    "Appendix"
                )

            # Check template is valid
            # try:
            #     get_template(template)
            # except TemplateDoesNotExist:
            #     raise InvalidYAMLValueError(
            #         self.structure_file_path,
            #         "template",
            #         "A valid template file path"
            #     )

            # Check number is integer and unique
            if not isinstance(number, int):
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "number",
                    "An integer"
                )
            if number in used_numbers:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "number",
                    "An unique number"
                )
            used_numbers.add(number)

            translations = self.get_blank_translation_dictionary()
            translations.update(appendices_translations.get(slug, dict()))

            appendix = Appendix(
                slug=slug,
                template=template,
                number=number,
            )
            self.populate_translations(appendix, translations)
            self.mark_translation_availability(appendix, required_fields=["name"])
            appendix.save()
            self.log("Added appendix: {}".format(appendices_translations[slug]["en"]["name"]))
        self.log("All appendices loaded!\n")
