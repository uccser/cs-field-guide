"""Module for the custom read_file template tag."""

from django import template
from django.contrib.staticfiles import finders
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def read_static_file(filepath):
    """Read file and return contents.

    This tag should not be used on any files provided
    by users, as they contents are automatically marked
    as safe.

    Args:
        filepath (str): File to read.

    Returns:
        Contents of file.
    """
    static_file = finders.find(filepath)

    if static_file:
        with open(static_file) as file_obj:
            contents = mark_safe(file_obj.read())
    else:
        raise FileNotFoundError('No static file found.')
    return contents
