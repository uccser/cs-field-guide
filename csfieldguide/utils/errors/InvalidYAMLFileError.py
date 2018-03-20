"""Custom error for invalid yaml file."""

from .Error import Error

ERROR_MESSAGE = """
Invalid YAML file (.yaml).

Options:
  - Does the file match the expected layout?
  - Does the file contain at least one key:value pair?
  - Is the syntax correct? (are you missing a colon somewhere?)
"""


class InvalidYAMLFileError(Error):
    """custom error for invalid yaml file."""

    def __init__(self, yaml_file_path):
        """Create error for invalid yaml file."""
        super().__init__()
        self.yaml_file_path = yaml_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for invalid yaml file.
        """
        return self.base_message.format(filename=self.yaml_file_path) + ERROR_MESSAGE
