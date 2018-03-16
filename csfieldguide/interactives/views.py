"""Views for the interactives application."""

from django.views import generic
from django.http import HttpResponse
from interactives.models import Interactive
from config.templatetags.render_interactive_in_page import render_interactive_html


class IndexView(generic.ListView):
    """View for the interactives application homepage."""

    template_name = "interactives/index.html"
    context_object_name = "all_interactives"

    def get_queryset(self):
        """Get queryset of all interactives.

        Returns:
            Queryset of Interactive objects.
        """
        return Interactive.objects.all()


def interactive_whole_page_view(request, interactive_slug):
    """View for a interactive in whole page mode."""
    return HttpResponse(render_interactive_html(interactive_slug, "whole-page"))


def interactive_iframe_view(request, interactive_slug):
    """View for a interactive in whole page mode."""
    return HttpResponse(render_interactive_html(interactive_slug, "iframe"))
