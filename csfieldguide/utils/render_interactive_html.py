"""Module for the custom render_interactive template tag."""

from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from interactives.models import Interactive

ALLOWED_MODES = (
    "in-page",
    "whole-page",
    "iframe",
)


def render_interactive_html(interactive_slug, mode):
    """

    """
    interactive = get_object_or_404(
        Interactive,
        slug=interactive_slug
    )
    if mode in ALLOWED_MODES:
        context = {
            "interactive": interactive,
            "interactive_mode": "interactives/base/{}.html".format(mode),
        }
    else:
        # Flesh out this error checking
        raise Exception("Interactive must be one of the following modes...")
    return render_to_string(interactive.template, context)
