"""Views for the interactives application."""

from django.views import generic
from .models import Interactive


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


class InteractiveView(generic.DetailView):
    """View for a specific interactive."""

    model = Interactive
    slug_url_kwarg = "interactive_slug"
    template_name = "interactives/whole-page-interactive-base.html"
