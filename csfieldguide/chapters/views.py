"""Views for the chapters application."""

from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.views import generic
from django.http import JsonResponse, Http404
from django.utils.translation import get_language
from utils.render_html_with_load_tags import render_html_with_load_tags
from chapters.models import (
    Chapter,
    ChapterSection,
    GlossaryTerm,
)


class IndexView(generic.ListView):
    """View for the chapters application homepage."""

    template_name = "chapters/index.html"
    context_object_name = "chapters"

    def get_queryset(self):
        """Get queryset of all chapters.

        Returns:
            Queryset of Chapter objects ordered by name.
        """
        return Chapter.objects.all()


class ChapterView(generic.DetailView):
    """View for intro section of a chapter."""

    model = Chapter
    template_name = "chapters/chapter.html"
    context_object_name = "chapter"
    slug_url_kwarg = "chapter_slug"

    def get_context_data(self, **kwargs):
        """Provide the context data for the chapter view.

        Returns:
            Dictionary of context data.
        """
        context = super(ChapterView, self).get_context_data(**kwargs)
        context["chapter_sections"] = ChapterSection.objects.filter(
            chapter__slug=self.object.slug
        )
        return context


class ChapterSectionView(generic.DetailView):
    """View for a specific section of a chapter."""

    model = ChapterSection
    template_name = "chapters/chapter_section.html"
    context_object_name = "chapter_section"

    def get_object(self, **kwargs):
        """Retrieve object for the chapter section view.

        Returns:
            ChapterSection object (ChapterSection).

        Raises:
           404 error: if object cannot be found.
        """
        return get_object_or_404(
            self.model.objects.select_related(),
            slug=self.kwargs.get("chapter_section_slug", None),
            chapter__slug=self.kwargs.get("chapter_slug", None)
        )

    def get_context_data(self, **kwargs):
        """Provide the context data for the chapter section view.

        Returns:
            Dictionary of context data.
        """
        context = super(ChapterSectionView, self).get_context_data(**kwargs)
        current_section_number = self.object.number
        context["previous_section"] = ChapterSection.objects.filter(
            chapter=self.object.chapter,
            number=current_section_number - 1
        )
        context["next_section"] = ChapterSection.objects.filter(
            chapter=self.object.chapter,
            number=current_section_number + 1
        )
        context["next_chapter"] = Chapter.objects.filter(
            number=self.object.chapter.number + 1
        )
        context["chapter"] = self.object.chapter
        context["headings"] = self.object.headings.filter(language=get_language())
        return context


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

    def get_context_data(self):
        """Get context data for template rendering."""
        return {
            "glossary_terms": GlossaryTerm.objects.filter(
                Q(languages__contains=[get_language()])
            ).order_by("term_en"),
            "untranslated_glossary_terms": GlossaryTerm.objects.filter(
                ~Q(languages__contains=[get_language()])
            ).order_by("term_en")
        }


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
        is_translated = get_language() in glossary_item.languages
        data = {
            "slug": glossary_slug,
            "term": glossary_item.term,
            "definition": render_html_with_load_tags(glossary_item.definition),
            "translated": is_translated
        }
        return JsonResponse(data)
    else:
        raise Http404("Term parameter not specified.")
