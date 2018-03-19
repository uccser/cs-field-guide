"""Custom error for Markdown style error."""

from .Error import Error

ERROR_MESSAGE = "\nConversion of file {filename} failed with error: \"{message}\"\n"
ERROR_MESSAGE_CODE_PART = "{line_number:<6}{line}\n"


class MarkdownStyleError(Error):
    """Custom error for markdown style errors."""

    def __init__(self, markdown_path, style_error):
        """Create the error for style errors."""
        super().__init__()
        self.markdown_path = markdown_path
        self.message = style_error.message
        self.line_nums = style_error.line_nums
        self.lines = style_error.lines

    def __str__(self):
        """Override default error string.

        Returns:
            Error message for style error.
        """
        base_message = self.base_message.format(filename=self.markdown_path)

        custom_message = ERROR_MESSAGE.format(filename=self.markdown_path, message=self.message)
        for i, line_num in enumerate(self.line_nums):
            custom_message += ERROR_MESSAGE_CODE_PART.format(line_number=line_num, line=self.lines[i])

        return base_message + custom_message
