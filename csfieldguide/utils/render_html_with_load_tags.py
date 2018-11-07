"""Module for the rendering HTML with Django load tags."""

from django import template

LOAD_TAGS = (
    "{% load static %}"
    "{% load i18n %}"
    "{% load render_interactive_in_page %}"
    "{% load render_interactive_link %}"
)


def render_html_with_load_tags(html, context=None):
    """Render the HTML with the static and interactive template tags.

    Args:
        html (str): String of HTML to render.

    Returns:
        Rendered string of HTML.
    """
    if not context:
        context = template.Context()
    return template.Template(LOAD_TAGS + html).render(context)
