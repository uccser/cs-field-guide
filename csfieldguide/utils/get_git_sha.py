"""Set git SHA value for displaying in footer."""

import environ


def get_git_sha():
    """Return git SHA value for displaying in footer.

    Returns:
        String value to display.\
    """
    env = environ.Env()
    git_sha = env("GIT_SHA", default=None)
    if not git_sha:
        git_sha = "local development"
    return git_sha
