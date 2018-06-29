"""Custom error for missing markdown file."""

from .Error import Error

ERROR_MESSAGE = "\nCould not find Markdown file.\n"


class CouldNotFindMarkdownFileError(Error):
    """Custom error for missing markdown file."""

    def __init__(self, md_file_path, config_file_path):
        """Create the error for missing markdown file."""
        super().__init__()
        self.md_file_path = md_file_path
        self.config_file_path = config_file_path

    def __str__(self):
        """
        Override default error string.

        Returns:
            Error message for missing markdown file.
        """
        base_message = self.base_message.format(filename=self.md_file_path)
        reference = self.reference_message.format(reference=self.config_file_path)
        return base_message + reference + ERROR_MESSAGE + self.missing_file_suggestions
