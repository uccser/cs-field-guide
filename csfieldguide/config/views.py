"""Views for the config application."""

from django.conf import settings
from django.http import JsonResponse
from config import __version__

from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def get_release_and_commit(request):
    """Return JSON containing the version number and Git commit hash."""
    return JsonResponse({
        "VERSION_NUMBER": __version__,
        "GIT_SHA": settings.GIT_SHA,
    })
