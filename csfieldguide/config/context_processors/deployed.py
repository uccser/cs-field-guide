"""Context processor for checking if in deployed environment."""

from django.conf import settings


def deployed(request):
    """Return a dictionary containing booleans regarding deployed environment.

    Returns:
        Dictionary containing deployed booleans to add to context.
    """
    return {
        "DEPLOYED": settings.DEPLOYED,
        "PRODUCTION_ENVIRONMENT": settings.PRODUCTION_ENVIRONMENT,
        "STAGING_ENVIRONMENT": settings.STAGING_ENVIRONMENT,
    }
