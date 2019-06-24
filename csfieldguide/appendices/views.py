"""Views for the appendices application."""

from django.views.generic import TemplateView
from chapters.models import Chapter


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

    def get_context_data(self, **kwargs):
        """Provide the context data for the chapter view.

        Returns:
            Dictionary of context data.
        """
        context = super(SitemapView, self).get_context_data(**kwargs)
        context["chapters"] = Chapter.objects.all()
        return context
