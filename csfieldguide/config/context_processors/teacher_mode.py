"""Context processor for storing teacher mode."""


def teacher_mode(request):
    """Return a dictionary containing boolean for teacher mode.

    Returns:
        Dictionary containing boolean for teacher mode.
    """
    return {
        "teacher_mode": request.session.get("teacher-mode", False)
    }
