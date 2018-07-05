"""Views for the general application."""

from django.http import HttpResponse


def health_check(request):
    """Return health check response for Google App Engine.

    Returns a 200 HTTP response for Google App Engine to detect the system
    is running.
    """
    return HttpResponse(status=200)
