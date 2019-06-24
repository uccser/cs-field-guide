"""Custom loader for loading appendices."""

from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
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

    def check_template(self, page_data, type):
        """Check template in page_data is valid.

        Args:
            page_data (dict): Dictionary of page data.
            type (str): Name of type of page.

        Returns:
            A valid template as string.

        Raises:
            MissingRequiredFieldError: If template value not given.
            InvalidYAMLValueError: If invalid template path given.
        """
        try:
            template = page_data["template"]
        except (TypeError, KeyError):
            raise MissingRequiredFieldError(
                self.structure_file_path,
                [
                    "template",
                ],
                type
            )
        try:
            get_template(template)
        except TemplateDoesNotExist:
            raise InvalidYAMLValueError(
                self.structure_file_path,
                "template ({})".format(template),
                "A valid template file path"
            )
        return template
