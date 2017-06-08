"""Custom error for invalid config file."""

from .Error import Error

ERROR_MESSAGE = """
Invalid configuration file.

Options:
  - Does the file match the expected layout?
  - Does the file contain at least one key:value pair?
  - Is the syntax correct? (are you missing a colon somewhere?)
"""


class InvalidConfigFileError(Error):
    """custom error for invalid config file."""

    def __init__(self, yaml_file_path):
        """Create error for invalid config file."""
        super().__init__()
        self.yaml_file_path = yaml_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for invalid config file.
        """
        return self.base_message.format(filename=self.yaml_file_path) + ERROR_MESSAGE
