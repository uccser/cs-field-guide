"""Custom error for empty config file."""

from .Error import Error

ERROR_MESSAGE = "\nA config file cannot be empty.\n"


class EmptyConfigFileError(Error):
    """Custom error for empty config file."""

    def __init__(self, yaml_file_path):
        """Create the error for empty config file."""
        super().__init__()
        self.yaml_file_path = yaml_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for empty config file.
        """
        return self.base_message.format(filename=self.yaml_file_path) + ERROR_MESSAGE
