"""Module for creating GET query string from dictionary."""

from utils.bool_to_yes_no import bool_to_yes_no


def query_string(values):
    """Create a GET query to append to a URL from the given values.

    Boolean values are changed to text to mimic forms.

    Args:
        values: A dictionary of keys/values of GET parameters.

    Returns:
        String of GET query.
    """
    string = "?"
    for index, (key, value) in enumerate(values):
        string += "{key}={value}".format(key=key, value=bool_to_yes_no(value))
        if index < len(values) - 1:
            string += "&"
    return string
