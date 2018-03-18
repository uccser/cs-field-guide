"""Views for the interactives application."""

from django.views import generic
from django.http import HttpResponse
from interactives.models import Interactive
from chapters.models import Chapter
from config.templatetags.render_interactive_in_page import render_interactive_html


class IndexView(generic.ListView):
    """View for the interactives application homepage."""

    template_name = "interactives/index.html"
    context_object_name = "interactives"

    def get_queryset(self):
        """Get queryset of all interactives.

        Returns:
            Queryset of Interactive objects.
        """
        return Interactive.objects.all()

    def get_context_data(self, **kwargs):
        """Provide the context data for the interactives view.

        Returns:
            Dictionary of context data.
        """
        context = super(IndexView, self).get_context_data(**kwargs)
        context["chapters"] = Chapter.objects.all().prefetch_related("interactives")
        return context


def interactive_whole_page_view(request, interactive_slug):
    """View for a interactive in whole page mode."""
    return HttpResponse(render_interactive_html(interactive_slug, "whole-page"))


def interactive_iframe_view(request, interactive_slug):
    """View for a interactive in whole page mode."""
    return HttpResponse(render_interactive_html(interactive_slug, "iframe"))
