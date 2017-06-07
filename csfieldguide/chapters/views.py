"""Views for the chapters application."""

from django.views.generic import TemplateView
from django.http import HttpResponse


class IndexView(TemplateView):
    """View for the homepage that renders from a template."""

    template_name = "chapters/index.html"