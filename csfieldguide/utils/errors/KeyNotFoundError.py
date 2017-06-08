"""Custom error for unknown key."""

from .Error import Error

ERROR_MESSAGE_TEMPLATE = """
Key: {key}
"{key}" did not match any {field}

Options:
  - Did you spell the name of the key correctly?
  - Does the key exist?
"""


class KeyNotFoundError(Error):
    """Custom error for unknown key."""

    def __init__(self, config_file_path, key, field):
        """Create the error for unknown key."""
        super().__init__()
        self.config_file_path = config_file_path
        self.key = key
        self.field = field

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for unknown key.
        """
        base_message = self.base_message.format(filename=self.config_file_path)
        error_message = ERROR_MESSAGE_TEMPLATE.format(key=self.key, field=self.field)
        return base_message + error_message
