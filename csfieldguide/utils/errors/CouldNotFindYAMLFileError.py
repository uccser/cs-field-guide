"""Custom error for missing yaml file."""

from .Error import Error

ERROR_MESSAGE = "\nCould not find YAML file (.yaml).\n"


class CouldNotFindYAMLFileError(Error):
    """Custom error for missing yaml file."""

    def __init__(self, yaml_file_path):
        """Create the error for missing yaml file."""
        super().__init__()
        self.yaml_file_path = yaml_file_path

    def __str__(self):
        """
        Override default error string.

        Returns:
            Error message for missing yaml file.
        """
        base_message = self.base_message.format(filename=self.yaml_file_path)
        return base_message + ERROR_MESSAGE + self.missing_file_suggestions
