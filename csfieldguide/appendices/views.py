"""Views for the appendices application."""

from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404


class AppendicesList(TemplateView):
    """View for the list of appendices."""

    template_name = "appendices/index.html"


class AboutView(TemplateView):
    """View for the about page."""

    template_name = "appendices/about.html"


class ContributorsView(TemplateView):
    """View for the contributors page."""

    template_name = "appendices/contributors.html"


class CurriculumGuidesView(TemplateView):
    """View for the curriculum guides."""

    template_name = "appendices/curriculum-guides/index.html"


class NceaView(TemplateView):
    """View for the ncea curriculum guide."""

    template_name = "appendices/curriculum-guides/ncea.html"


class ApcspView(TemplateView):
    """View for the apcsp curriculum guide."""

    template_name = "appendices/curriculum-guides/apcsp.html"


class SitemapView(TemplateView):
    """View for the about page."""

    template_name = "appendices/sitemap.html"

