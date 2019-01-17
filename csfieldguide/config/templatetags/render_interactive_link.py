"""Module for the custom render_interactive_link template tag."""

from django import template
from django.conf import settings
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from interactives.models import Interactive
from django.utils.translation import get_language
register = template.Library()


@register.simple_tag(takes_context=True)
def render_interactive_link(context, interactive, *args, **kwargs):
    """Render link button to interactive in whole-page mode.

    Args:
        interactive (str or Interactive): Slug of interactive or interactive object.

    Returns:
        Rendered string of HTML.
    """
    if not isinstance(interactive, Interactive):
        interactive = get_object_or_404(
            Interactive,
            slug=interactive
        )

    parameters = kwargs.get("parameters", None)
    text = kwargs.get("text", None)

    # Trim '?' at start if present
    if isinstance(parameters, str) and parameters.startswith("?"):
        parameters = parameters[1:]

    context = {
        "interactive": interactive,
        "interactive_thumbnail": "img/interactives/thumbnails/{}/{}.png".format(get_language(), interactive.slug),
        "parameters": parameters,
        "text": text,
    }
    return render_to_string(settings.INTERACTIVES_LINK_TEMPLATE, context, request=context.get("request"))
