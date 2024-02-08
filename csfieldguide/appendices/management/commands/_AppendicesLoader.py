"""Custom loader for loading appendices."""

from django.db import transaction
from appendices.models import Appendix
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from django.template.loader import get_template
from django.template import TemplateDoesNotExist
from django.urls import reverse, NoReverseMatch


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
        """Load general pages.

        Raise:
            MissingRequiredFieldError: when no object can be found with the matching
                attribute.
        """
        general_pages = self.load_yaml_file(self.structure_file_path)

        for (slug, page_data) in general_pages.items():
            try:
                name = page_data["name"]

            except (TypeError, KeyError):
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    [
                        "name",
                    ],
                    "Appendix"
                )

            # Check template is valid
            template = f"appendices/{slug}.html"
            try:
                get_template(template)
            except TemplateDoesNotExist:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "template",
                    "A valid template file path"
                )

            # Check URL name is valid
            url_name = f"appendices:{slug}"
            try:
                reverse(url_name)
            except NoReverseMatch:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "url-name",
                    "A URL name listed in 'csfieldguide/appendices/urls.py'"
                )

            appendix_page, created = Appendix.objects.update_or_create(
                slug=slug,
                defaults={
                    'name': name,
                    'template': template,
                    'url_name': url_name,
                }
            )
            appendix_page.save()
            if created:
                term = 'Created'
            else:
                term = 'Updated'
            self.log(f'{term} general page: {name}')

        Appendix.objects.exclude(slug__in=general_pages.keys()).delete()

        self.log("All general pages loaded!\n")
