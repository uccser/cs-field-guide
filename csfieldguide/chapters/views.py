"""Views for the chapters application."""

from django.shortcuts import get_object_or_404
from django.views import generic
from django.http import JsonResponse, Http404

from general.templatetags.render_html_field import render_html_with_static

from .models import Chapter, GlossaryTerm


class IndexView(generic.ListView):
    """View for the chapters application homepage."""

    template_name = "chapters/index.html"
    context_object_name = "all_chapters"

    def get_queryset(self):
        """Get queryset of all chapters.

        Returns:
            Queryset of Chapter objects ordered by name.
        """
        return Chapter.objects.order_by("name")


class GlossaryList(generic.ListView):
    """Provide glossary view of all terms."""

    template_name = "chapters/glossary.html"
    context_object_name = "glossary_terms"

    def get_queryset(self):
        """Get queryset of all glossary terms.

        Returns:
            Queryset of GlossaryTerm objects ordered by term.
        """
        return GlossaryTerm.objects.order_by("term")


class ChapterView(generic.DetailView):
    """View for a specific topic."""

    model = Chapter
    template_name = "chapters/chapter.html"
    slug_url_kwarg = "chapter_slug"

    # def get_context_data(self, **kwargs):
    #     """Provide the context data for the chapter view.

    #     Returns:
    #         Dictionary of context data.
    #     """
    #     # Call the base implementation first to get a context
    #     context = super(ChapterView, self).get_context_data(**kwargs)
    #     return context


def glossary_json(request, **kwargs):
    """Provide JSON data for glossary term.

    Args:
        request: The HTTP request.

    Returns:
        JSON response is sent containing data for the requested term.
    """
    # If term parameter, then return JSON
    if "term" in request.GET:
        glossary_slug = request.GET.get("term")
        glossary_item = get_object_or_404(
            GlossaryTerm,
            slug=glossary_slug
        )
        data = {
            "slug": glossary_slug,
            "term": glossary_item.term,
            "definition": render_html_with_static(glossary_item.definition)
        }
        return JsonResponse(data)
    else:
        raise Http404("Term parameter not specified.")

