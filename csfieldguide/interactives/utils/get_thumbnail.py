"""Functions for getting a thumbnail for an interactive."""

from os.path import join
from django.utils.translation import get_language


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
    interactive_thumbnail_base = join(
        "build",
        "img",
        "interactives",
        "thumbnails",
        get_language(),
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
