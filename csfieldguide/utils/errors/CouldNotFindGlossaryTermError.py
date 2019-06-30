"""Custom error for missing glossary term."""

from .Error import Error

ERROR_MESSAGE_TEMPLATE = """
Could not find glossary term: {term}

Options:
  - Is the glossary term key defined in the
    application structure file?
  - Is the term spelt correctly?
"""


class CouldNotFindGlossaryTermError(Error):
    """Custom error for missing glossary term."""

    def __init__(self, term, reference_file_path):
        """Create the error could not find glossary term."""
        super().__init__()
        self.term = term
        self.reference_file_path = reference_file_path

    def __str__(self):
        """
        Override default error string.

        Returns:
            Error message for missing glossary term.
        """
        base_message = self.base_message.format(filename=self.reference_file_path)
        missing_field_message = ERROR_MESSAGE_TEMPLATE.format(
            term=self.term
        )
        return base_message + missing_field_message
