"""Custom error for empty yaml file."""

from .Error import Error

ERROR_MESSAGE = "\nA YAML file cannot be empty.\n"


class EmptyYAMLFileError(Error):
    """Custom error for empty yaml file."""

    def __init__(self, yaml_file_path):
        """Create the error for empty yaml file."""
        super().__init__()
        self.yaml_file_path = yaml_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for empty yaml file.
        """
        return self.base_message.format(filename=self.yaml_file_path) + ERROR_MESSAGE
