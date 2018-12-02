"""Module for the custom query_replace template tag."""

from urllib.parse import urlencode
from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def query_replace(context, **kwargs):
    """Render URL query string with given values replaced.

    Args:
        context (dict): Dictionary of view context.

    Returns:
        Rendered query string.
    """
    query = context["request"].GET.dict()
    query.update(kwargs)
    return urlencode(query)
