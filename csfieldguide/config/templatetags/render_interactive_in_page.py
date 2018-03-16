"""Module for the custom render_interactive template tag."""

from django import template
from utils.render_interactive_html import render_interactive_html

ALLOWED_MODES = (
    "in-page",
    "whole-page",
    "iframe",
)

register = template.Library()


@register.simple_tag
def render_interactive_in_page(interactive_slug):
    """

    """
    return render_interactive_html(interactive_slug, "in-page")
