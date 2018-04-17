"""Custom loader for loading general pages."""

from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from general.models import GeneralPage
from django.template.loader import get_template
from django.template import TemplateDoesNotExist


class GeneralPagesLoader(TranslatableModelLoader):
    """Custom loader for loading general pages."""

    def __init__(self, factory, **kwargs):
        """Create the loader for loading GeneralPages.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
        """
        super().__init__(**kwargs)
        self.factory = factory

    @transaction.atomic
    def load(self):
        """Load general pages.

        Raise:
            MissingRequiredFieldError: when no object can be found with the matching
                attribute.
        """
        general_pages = self.load_yaml_file(self.structure_file_path)
        general_pages_translations = self.get_yaml_translations(
            self.structure_filename,
            required_fields=["name"],
            required_slugs=general_pages.keys()
        )
        used_numbers = set()

        for (slug, page_data) in general_pages.items():
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
                    "General page"
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
            translations.update(general_pages_translations.get(slug, dict()))

            general_page = GeneralPage(
                slug=slug,
                template=template,
                number=number,
            )
            self.populate_translations(general_page, translations)
            self.mark_translation_availability(general_page, required_fields=["name"])
            general_page.save()
            self.log("Added general page: {}".format(general_pages_translations[slug]["en"]["name"]))
        self.log("All general pages loaded!\n")
