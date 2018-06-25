"""Custom error for Verto error."""

from .Error import Error

ERROR_MESSAGE = "\nConversion failed with error: \"{message}\"\n"
ERROR_MESSAGE_CODE_PART = "{line_number:<6}{line}\n"


class VertoConversionError(Error):
    """Custom error for Verto errors."""

    def __init__(self, markdown_path, verto_error):
        """Create the error for Verto errors."""
        super().__init__()
        self.markdown_path = markdown_path
        self.verto_error = verto_error

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for Verto error.
        """
        base_message = self.base_message.format(filename=self.markdown_path)
        custom_message = ERROR_MESSAGE.format(message=self.verto_error.message)
        if hasattr(self.verto_error, "line_nums") and hasattr(self.verto_error, "lines"):
            for i, line_num in enumerate(self.verto_error.line_nums):
                custom_message += ERROR_MESSAGE_CODE_PART.format(
                    line_number=line_num,
                    line=self.verto_error.lines[i]
                )
        return base_message + custom_message
