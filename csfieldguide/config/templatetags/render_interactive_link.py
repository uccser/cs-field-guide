"""Module for the custom render_interactive_link template tag."""

from django import template
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from interactives.models import Interactive

register = template.Library()

INTERACTIVE_LINK_BUTTON_TEMPLATE = "interactives/utils/interactive-link.html"


@register.simple_tag(takes_context=True)
def render_interactive_link(context, interactive_slug, request=None):
    """Render link button to interactive in whole-page mode.

    Args:
        interactive_slug (str): Slug of interactive.

    Returns:
        Rendered string of HTML.
    """
    interactive = get_object_or_404(
        Interactive,
        slug=interactive_slug
    )
    context = {"interactive": interactive}
    return render_to_string(INTERACTIVE_LINK_BUTTON_TEMPLATE, context, request=request)
