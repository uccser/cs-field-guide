"""Views for the general application."""

from django.views.generic import TemplateView


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
