"""Module for the rendering HTML for an interactive."""

from os.path import join
from django.http import Http404
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from django.conf import settings
from interactives.models import Interactive

ALLOWED_MODES = (
    "in-page",
    "whole-page",
    "iframe",
    "centered"
)


def render_interactive_html(interactive_slug, mode, request=None):
    """Return the HTML for an interactive.

    Args:
        interactive_slug (str): Slug of interactive.
        mode (str): Mode interactive should be rendered in.
        request (Request): Request object to render template with.

    Returns:
        Rendered string of HTML.
    """
    interactive = get_object_or_404(
        Interactive,
        slug=interactive_slug
    )
    if mode in ALLOWED_MODES:
        mode_template = join(settings.INTERACTIVES_BASE_TEMPLATES_PATH, "{}.html".format(mode))
        context = {
            "interactive": interactive,
            "interactive_mode_template": mode_template,
        }
    else:
        raise Http404("Interactive mode must be one of ('{}')".format("', '".join(ALLOWED_MODES)))
    return render_to_string(interactive.template, context, request=request)
