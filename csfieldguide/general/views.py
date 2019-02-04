"""Views for the general application."""

from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.views.generic.base import RedirectView


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


def redirect_changelog(request):
    """ redirects csfieldguide.org.nz/further-information/releases.html to the changelog docs. """
    return redirect("https://cs-field-guide.readthedocs.io/en/latest/changelog.html")
