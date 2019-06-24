"""Custom error for duplicate headings."""

from .Error import Error

ERROR_MESSAGE = """The file contains more than one heading with the same text.

To ensure heading permalinks on a page are unique, each title
should have unique text.
"""


class DuplicateHeadingFoundInMarkdownFileError(Error):
    """Custom error for duplicate headings."""

    def __init__(self, md_file_path):
        """Create error for duplicate headings."""
        super().__init__()
        self.md_file_path = md_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for missing heading.
        """
        return self.base_message.format(filename=self.md_file_path) + ERROR_MESSAGE
