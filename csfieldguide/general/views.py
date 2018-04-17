"""Views for the general application."""

from django.views.generic import TemplateView, DetailView
from django.shortcuts import redirect
from general.models import (
    GeneralPage,
    GeneralSubpage,
)

class GeneralIndexView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/index.html"


class GeneralPageView(DetailView):
    """View for a specific page."""

    model = GeneralPage
    slug_url_kwarg = "page_slug"
    context_object_name = "page"

    def get_template_names(self, **kwargs):
        """Provide the template name for general page view.

        Returns:
            Name of template from object.
        """
        return self.object.template


class GeneralSubpageView(DetailView):
    """View for a specific page."""

    model = GeneralSubpage
    context_object_name = "subpage"

    def get_object(self, **kwargs):
        """Retrieve object for general subpage view.

        Returns:
            GeneralSubpage object, or raises 404 error if not found.
        """
        return get_object_or_404(
            self.model.objects.select_related(),
            parent_page__slug=self.kwargs.get("page_slug", None),
            slug=self.kwargs.get("subpage_slug", None)
        )

    def get_template_names(self, **kwargs):
        """Provide the template name for the page view.

        Returns:
            Name of template from object.
        """
        return self.object.template


def set_teacher_mode(request, mode):
    """Set session variable 'teacher mode' to true.

    Args:
        request (Request): Object of user's request.
        mode (Bool): True if user's session should be set to teacher mode,
            False if user should revert to student mode.

    Returns:
        Redirect back to previous page or homepage.
    """
    request.session["teacher-mode"] = mode
    return redirect(request.GET.get("next", "general:index"), permanent=False)
