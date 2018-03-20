"""Custom error for missing required field."""

from .Error import Error

ERROR_MESSAGE_TEMPLATE = """
The following models are missing from the file:
{models}
"""


class MissingRequiredModelsError(Error):
    """Custom error for missing required models."""

    def __init__(self, config_file_path, required_models):
        """Create error for missing required field."""
        super().__init__()
        self.config_file_path = config_file_path
        self.required_models = required_models

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for missing required field.
        """
        missing_model_message = ERROR_MESSAGE_TEMPLATE.format(
            models=self.required_models,
        )
        return self.base_message.format(filename=self.config_file_path) + missing_model_message
