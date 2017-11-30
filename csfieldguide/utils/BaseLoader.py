"""Base loader used to create custom loaders for content."""

import yaml
import mdx_math
import abc
import sys
import re
import os.path
from os import listdir
from verto import Verto

# from .check_required_files import check_converter_required_files
from utils.check_glossary_links import check_converter_glossary_links
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError
from utils.errors.EmptyConfigFileError import EmptyConfigFileError
from utils.errors.InvalidConfigFileError import InvalidConfigFileError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.CouldNotFindConfigFileError import CouldNotFindConfigFileError


class BaseLoader():
    """Base loader class for individual loaders."""

    def __init__(self, BASE_PATH=""):
        """Create a BaseLoader object.

        Args:
            BASE_PATH: string of base path (str).
        """
        self.BASE_PATH = BASE_PATH
        self.setup_md_to_html_converter()

    def setup_md_to_html_converter(self):
        """Create Markdown converter.

        The converter is created with custom processors, html templates,
        and extensions.
        """
        # templates = self.load_template_files()
        extensions = [
            "markdown.extensions.fenced_code",
            "markdown.extensions.codehilite",
            "markdown.extensions.sane_lists",
            "markdown.extensions.tables",
            mdx_math.MathExtension(enable_dollar_delimiter=True)
        ]
        self.converter = Verto(extensions=extensions)
        custom_processors = self.converter.processor_defaults()
        custom_processors.add("remove-title")
        self.converter.update_processors(custom_processors)

    def convert_md_file(self, md_file_path, config_file_path, heading_required=True):
        """Return the Verto object for a given Markdown file.

        Args:
            md_file_path: Location of Markdown file to convert (str).
            config_file_path: Path to related the config file (str).

        Returns:
            VertoResult object

        Raises:
            CouldNotFindMarkdownFileError: when a given Markdown file cannot be found.
            NoHeadingFoundInMarkdownFileError: when no heading can be found in a given
                Markdown file.
            EmptyMarkdownFileError: when no content can be found in a given Markdown
                file.
        """
        try:
            # check file exists
            content = open(md_file_path, encoding="UTF-8").read()
        except FileNotFoundError:
            raise CouldNotFindMarkdownFileError(md_file_path, config_file_path)

        result = self.converter.convert(content)

        if heading_required:
            if result.title is None:
                raise NoHeadingFoundInMarkdownFileError(md_file_path)

        if len(result.html_string) == 0:
            raise EmptyMarkdownFileError(md_file_path)
        # check_converter_required_files(result.required_files, md_file_path)
        check_converter_glossary_links(result.required_glossary_terms, md_file_path)
        return result

    def log(self, message, indent_amount=0):
        """Output the log message to the load log.

        Args:
            message: Text to display (str).
            indent_amount: Amount of indentation required (int).
        """
        indent = "  " * indent_amount
        text = "{indent}{text}\n".format(indent=indent, text=message)
        sys.stdout.write(text)

    def load_yaml_file(self, yaml_file_path):
        """Load and read given YAML file.

        Args:
            file_path: location of yaml file to read (str).

        Returns:
            Either list or string, depending on structure of given yaml file

        Raises:
            CouldNotFindConfigFileError: when a given config file cannot be found.
            InvalidConfigFileError: when a given config file is incorrectly formatted.
            EmptyConfigFileError: when a give config file is empty.
        """
        try:
            yaml_file = open(yaml_file_path, encoding="UTF-8").read()
        except FileNotFoundError:
            raise CouldNotFindConfigFileError(yaml_file_path)

        try:
            yaml_contents = yaml.load(yaml_file)
        except yaml.YAMLError:
            raise InvalidConfigFileError(yaml_file_path)

        if yaml_contents is None:
            raise EmptyConfigFileError(yaml_file_path)

        if isinstance(yaml_contents, dict) is False:
            raise InvalidConfigFileError(yaml_file_path)

        return yaml_contents

    def load_template_files(self):
        """Load custom HTML templates for converter.

        Returns:
            templates: dictionary of html templates
        """
        templates = dict()
        template_path = os.path.join(
            os.path.dirname(__file__),
            "custom_converter_templates/"
        )
        for file in listdir(template_path):
            template_file = re.search(r"(.*?).html$", file)
            if template_file:
                template_name = template_file.groups()[0]
                templates[template_name] = open(template_path + file).read()
        return templates

    @abc.abstractmethod
    def load(self):
        """Abstract method to be implemented by subclasses.

        Raise:
            NotImplementedError: when a user attempts to run the load() method of the
                BaseLoader class.
        """
        raise NotImplementedError("Subclass does not implement this method")
