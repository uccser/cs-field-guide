"""Context processor for displaying chapters in nav bar."""

from chapters.models import Chapter


def nav_context(context):
    """Query database for chapter objects.

    Returns:
        Dictionary containing list of chapter objects
    """
    return {'chapters': Chapter.objects.all()}
