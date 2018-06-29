"""Module for the custom render_html_field template tag."""

from django import template
from utils.render_html_with_load_tags import render_html_with_load_tags

register = template.Library()


@register.simple_tag(takes_context=True)
def render_html_field(context, html):
    """Render the HTML with the static template tag.

    Args:
        html (str): String of HTML to render.

    Returns:
        Rendered string of HTML.
    """
    return render_html_with_load_tags(html, context)
