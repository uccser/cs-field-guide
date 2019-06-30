"""Custom error for invalid config file value."""

from .Error import Error

ERROR_MESSAGE = """
Invalid configuration file value for: {key}

Expected: {expected}
"""


class InvalidYAMLValueError(Error):
    """Custom error for invalid config file value."""

    def __init__(self, yaml_file_path, key, expected):
        """Create error for invalid config file value."""
        super().__init__()
        self.yaml_file_path = yaml_file_path
        self.key = key
        self.expected = expected

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for invalid config file value.
        """
        base_message = self.base_message.format(filename=self.yaml_file_path)
        error_message = ERROR_MESSAGE.format(key=self.key, expected=self.expected)
        return base_message + error_message
