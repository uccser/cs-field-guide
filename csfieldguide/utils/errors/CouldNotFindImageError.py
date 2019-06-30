"""Custom error for missing image."""

from .Error import Error

ERROR_MESSAGE = "\nCould not find image.\n"


class CouldNotFindImageError(Error):
    """Custom error for missing image."""

    def __init__(self, image_path, reference_file_path):
        """Create the error missing image."""
        super().__init__()
        self.image_path = image_path
        self.reference_file_path = reference_file_path

    def __str__(self):
        """
        Override default error string.

        Returns:
            Error message for missing image file.
        """
        base_message = self.base_message.format(filename=self.image_path)
        reference = self.reference_message.format(reference=self.reference_file_path)
        return base_message + reference + ERROR_MESSAGE + self.missing_file_suggestions
