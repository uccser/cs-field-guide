"""Module for the custom render_interactive_in_page template tag."""

from django import template
from utils.render_interactive_html import render_interactive_html

register = template.Library()


@register.simple_tag(takes_context=True)
def render_interactive_in_page(context, interactive_slug):
    """Render the interactive HTML.

    Args:
        interactive_slug (str): Slug of interactive.

    Returns:
        Rendered string of HTML.
    """
    return render_interactive_html(interactive_slug, "in-page", context.get("request"))
