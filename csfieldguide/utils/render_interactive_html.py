"""Module for the rendering HTML for an interactive."""

from os.path import join
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from django.conf import settings
from interactives.models import Interactive
from django.template.context_processors import i18n

ALLOWED_MODES = (
    "in-page",
    "whole-page",
    "iframe",
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
        # context.update(i18n(None))
    else:
        # Flesh out this error checking
        raise Exception("Interactive must be one of the following modes...")
    return render_to_string(interactive.template, context, request=request)
