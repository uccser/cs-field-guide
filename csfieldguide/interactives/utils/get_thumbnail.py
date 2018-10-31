"""Functions for getting a thumbnail for an interactive."""

from os.path import join
from django.conf import settings
from django.utils.translation import get_language
from utils.render_interactive_html import render_interactive_html


def get_thumbnail_filename(interactive_slug):
    """Create thumbnail filename for a given interactive and options.

    Args:
        interactive_slug (str): Slug of interactive to create thumbnail for.
    """
    return "{}.png".format(interactive_slug)


def get_thumbnail_base():
    """Return base thumbnail path for a given interactive.

    Preview shows English version if in local development or
    viewing in-context language.

    Returns:
        String of thumbnail base.
    """
    if settings.DJANGO_PRODUCTION:
        interactive_language = get_language()
        if interactive_language in settings.INCONTEXT_L10N_PSEUDOLANGUAGES:
            interactive_language = "en"
    else:
        interactive_language = "en"
    interactive_thumbnail_base = join(
        settings.STATIC_URL,
        "img/interactives/",
        "thumbnails",
        interactive_language,
        ""
    )
    return interactive_thumbnail_base


def get_thumbnail_static_path_for_interactive(interactive):
    """Return static path to thumbnail for interactive.

    Args:
        interactive (Interactive): Interactive to get thumbnail for.

    Returns:
        String of static path to thumbnail.
    """
    thumbnail = join(
        get_thumbnail_base(),
        get_thumbnail_filename(interactive.slug)
    )
    return thumbnail


def save_thumbnail(interactive):
    """Save thumbnail of interactive.

    Args:
        interactive (Interactive): Interactive to get thumbnail for.

    Returns:
        String of static path to thumbnail.
    """
    file_path = get_thumbnail_static_path_for_interactive(interactive)
    html = render_interactive_html(interactive.slug, "centered")
    # Create and save image
