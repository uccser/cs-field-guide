"""Context processor for displaying version number."""

from config import __version__
from django.conf import settings


def version_number(request):
    """Return a dictionary containing version information.

    Returns:
        Dictionary containing version number and Git SHA to add to context.
    """
    return {
        "VERSION_NUMBER": __version__,
        "GIT_SHA": settings.GIT_SHA,
    }
