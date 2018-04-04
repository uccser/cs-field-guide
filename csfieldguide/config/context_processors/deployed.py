"""Context processor for checking if in deployed environment."""

import environ


def deployed(request):
    """Return a dictionary containing boolean if deployed environment.

    Returns:
        Dictionary containing deployed boolean to add to context.
    """
    env = environ.Env()
    return {
        "DEPLOYED": env.bool("DJANGO_PRODUCTION", False)
    }
