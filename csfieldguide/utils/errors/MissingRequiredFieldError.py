"""Custom error for missing required field."""

from .Error import Error

ERROR_MESSAGE_TEMPLATE = """
A {model} requires the following field{plural}:
{fields}
For the missing field{plural}:
  - Is the field name spelt correctly?
  - Does the field have the correct value?
"""


class MissingRequiredFieldError(Error):
    """Custom error for missing required field."""

    def __init__(self, config_file_path, required_fields, model):
        """Create error for missing required field."""
        super().__init__()
        self.config_file_path = config_file_path
        self.required_fields = required_fields
        self.model = model

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for missing required field.
        """
        fields = ""
        for field in self.required_fields:
            fields += "  - {field}\n".format(field=str(field))
        if len(self.required_fields) > 1:
            plural = "s"
        else:
            plural = ""
        missing_field_message = ERROR_MESSAGE_TEMPLATE.format(
            model=self.model,
            fields=fields,
            plural=plural,
        )
        return self.base_message.format(filename=self.config_file_path) + missing_field_message
