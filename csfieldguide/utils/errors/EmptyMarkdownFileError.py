"""Custom error for empty markdown file."""

from .Error import Error

ERROR_MESSAGE = """
The file contains no content.

Note: A file containing a title and no other content is
also considered to be empty.
"""


class EmptyMarkdownFileError(Error):
    """Custom error for empty markdown file."""

    def __init__(self, md_file_path):
        """Create the error for empty markdown file."""
        super().__init__()
        self.md_file_path = md_file_path

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for empty markdown file.
        """
        return self.base_message.format(filename=self.md_file_path) + ERROR_MESSAGE
