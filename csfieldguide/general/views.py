"""Views for the general application."""

from django.views.generic import TemplateView
from django.http import HttpResponse


class GeneralIndexView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "general/index.html"