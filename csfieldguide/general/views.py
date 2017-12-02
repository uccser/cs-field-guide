"""Views for the general application."""

from django.views.generic import TemplateView, ListView
from chapters.models import Chapter


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


class NavView(ListView):
    """View for the navigation bar."""

    template_name = "navigation.html"
    context_object_name = "chapters"

    def get_queryset(self):
        """Get queryset of all topics.

        Returns:
            Queryset of Topic objects ordered by name.
        """
        return Chapter.objects.order_by("name")
