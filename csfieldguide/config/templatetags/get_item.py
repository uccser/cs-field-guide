"""Module for the custom get_item template tag."""

from django import template

register = template.Library()


@register.simple_tag
def get_item(dictionary, key, default=None):
    """Set value for key in dictionary, otherwise return default.

    Args:
        dictionary (dict): Dictionary of values.
        key (str): Key of value in dictionary.
        default (str): Default value to return if key not found.

    Returns:
        Value from dictionary or default.
    """
    return dictionary.get(key, default=default)
