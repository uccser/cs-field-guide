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
        """Load appendices pages.

        Raise:
            MissingRequiredFieldError: when no object can be found with the matching
                attribute.
            InvalidYAMLValueError: when invalid template path given or missing valid URL in urls.
        """
        appendix_pages = self.load_yaml_file(self.structure_file_path)

        for (slug, page_data) in appendix_pages.items():
            try:
                template = page_data["template"]
            except (TypeError, KeyError):
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    [
                        "template",
                    ],
                    "Appendix"
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

            # Check URL name is valid
            url_name = f"appendices:{slug}"
            try:
                reverse(url_name)
            except NoReverseMatch:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    f"<{slug}>",
                    f"A URL name listed in 'csfieldguide/appendices/urls.py' matching '{url_name}'."
                )

            # Get Title Case from kebab-case name
            name = slug.title().replace('-', ' ')

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
            self.log(f'{term} appendix page: {name}')

        Appendix.objects.exclude(slug__in=appendix_pages.keys()).delete()

        self.log("All appendix pages loaded!\n")
