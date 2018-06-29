"""Views for the appendices application."""

from django.views.generic import TemplateView, DetailView
from django.shortcuts import get_object_or_404
from appendices.models import (
    Appendix,
    Subappendix,
)


class AppendicesList(TemplateView):
    """View for the list of appendices."""

    template_name = "appendices/index.html"


class AppendixView(DetailView):
    """View for a specific page."""

    model = Appendix
    slug_url_kwarg = "appendix_slug"
    context_object_name = "appendix"

    def get_template_names(self, **kwargs):
        """Provide the template name for appendix view.

        Returns:
            Name of template from object.
        """
        return self.object.template


class SubappendixView(DetailView):
    """View for a specific page."""

    model = Subappendix
    context_object_name = "subappendix"

    def get_object(self, **kwargs):
        """Retrieve object for subappendiz view.

        Returns:
            Subappendix object, or raises 404 error if not found.
        """
        return get_object_or_404(
            self.model.objects.select_related(),
            parent_page__slug=self.kwargs.get("appendix_slug", None),
            slug=self.kwargs.get("subappendix_slug", None)
        )

    def get_template_names(self, **kwargs):
        """Provide the template name for the page view.

        Returns:
            Name of template from object.
        """
        return self.object.template
