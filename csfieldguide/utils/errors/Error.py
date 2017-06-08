"""Base error used to create custom errors for loaders."""

ERROR_TITLE_TEMPLATE = "\n****************************ERROR****************************\n"
ERROR_FILENAME_TEMPLATE = "File: {filename}\n"
ERROR_REFERENCE_TEMPLATE = "Referenced in: {reference}\n"
ERROR_SUGGESTIONS_TEMPLATE = """
  - Did you spell the name of the file correctly?
  - Does the file exist?
  - Is the file saved in the correct directory?
"""


class Error(Exception):
    """Base class for Errors.

    (Exceptions from external sources such as inputs).
    """

    def __init__(self):
        """Create the base class for errors."""
        self.base_message = ERROR_TITLE_TEMPLATE + ERROR_FILENAME_TEMPLATE
        self.reference_message = ERROR_REFERENCE_TEMPLATE
        self.missing_file_suggestions = ERROR_SUGGESTIONS_TEMPLATE
