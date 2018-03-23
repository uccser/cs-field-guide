"""Views for the general application."""

from django.views.generic import TemplateView
from django.shortcuts import redirect


class GeneralIndexView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/index.html"


class GeneralAboutView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/about.html"


class GeneralContributorsView(TemplateView):
    """View for the contributors page that renders from a template."""

    template_name = "general/contributors.html"


class GeneralReleasesView(TemplateView):
    """View for the releases page that renders from a template."""

    template_name = "general/releases.html"


def teacher_mode_login(request):
    request.session["teacher-mode"] = True
    return redirect("general:index", permanent=False)


def teacher_mode_logout(request):
    request.session["teacher-mode"] = False
    return redirect("general:index", permanent=False)
