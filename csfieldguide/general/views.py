"""Views for the general application."""

from django.views.generic import TemplateView
from django.shortcuts import redirect


class GeneralIndexView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/index.html"


def set_teacher_mode(request, mode):
    """Set session variable 'teacher mode' to true.

    Args:
        request (Request): Object of user's request.
        mode (Bool): True if user's session should be set to teacher mode,
            False if user should revert to student mode.

    Returns:
        Redirect back to previous page or homepage.
    """
    request.session["teacher-mode"] = mode
    return redirect(request.GET.get("next", "general:index"), permanent=False)
