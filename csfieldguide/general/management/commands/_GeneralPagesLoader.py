"""Custom loader for loading general pages."""

from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from general.models import GeneralPage, GeneralSubpage
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

        for (slug, page_data) in general_pages.items():
            template = self.get_template_value(page_data)
            translations = self.get_blank_translation_dictionary()
            translations.update(general_pages_translations.get(slug, dict()))
            general_page = GeneralPage(
                slug=slug,
                template=template,
            )
            self.populate_translations(general_page, translations)
            self.mark_translation_availability(general_page, required_fields=["name"])
            general_page.save()
            self.log("Added general page: {}".format(general_pages_translations[slug]["en"]["name"]))

            # Load subpages
            subpages = page_data.get("subpages", dict())
            for subpage_slug, subpage_data in subpages.items():
                subpage_template = self.get_template_value(subpage_data)
                general_subpage = GeneralSubpage(
                    slug=subpage_slug,
                    template=subpage_template,
                    parent_page=general_page,
                )
                self.populate_translations(general_subpage, translations)
                self.mark_translation_availability(general_subpage, required_fields=["name"])
                general_subpage.save()
                self.log("Added general subpage: {}".format(general_pages_translations[subpage_slug]["en"]["name"]), 1)


        self.log("All general pages loaded!\n")

    def get_template_value(self, page_data):
        """Get valid template value.

        Args:
            page_data (dict): Dictionary of page data.

        Returns:
            String of template path.
        """
        try:
            template = page_data["template"]
        except (TypeError, KeyError):
            raise MissingRequiredFieldError(
                self.structure_file_path,
                [
                    "template",
                ],
                "General page"
            )

        # Check template is valid
        try:
            get_template(template)
        except TemplateDoesNotExist:
            raise InvalidYAMLValueError(
                self.structure_file_path,
                "template",
                "A valid template file path"
            )
        return template
