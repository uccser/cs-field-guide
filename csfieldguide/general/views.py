"""Views for the general application."""

from django.views.generic import TemplateView


class GeneralIndexView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/index.html"


class GeneralAboutView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/about.html"
