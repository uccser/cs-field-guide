"""Custom error for missing config file."""

from .Error import Error

ERROR_MESSAGE = "\nCould not find config file.\n"


class CouldNotFindConfigFileError(Error):
    """Custom error for missing config file."""

    def __init__(self, config_file_path):
        """Create the error for missing config file."""
        super().__init__()
        self.config_file_path = config_file_path

    def __str__(self):
        """
        Override default error string.

        Returns:
            Error message for missing config file.
        """
        base_message = self.base_message.format(filename=self.config_file_path)
        return base_message + ERROR_MESSAGE + self.missing_file_suggestions
