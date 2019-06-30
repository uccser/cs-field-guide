"""Custom error for missing heading."""

from .Error import Error

ERROR_MESSAGE = "\nThe file does not contain a heading.\n"


class NoHeadingFoundInMarkdownFileError(Error):
    """Custom error for missing heading."""

    def __init__(self, md_file_path):
        """Create error for missing heading."""
        super().__init__()
        self.md_file_path = md_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for missing heading.
        """
        return self.base_message.format(filename=self.md_file_path) + ERROR_MESSAGE
