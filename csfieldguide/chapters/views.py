"""Views for the chapters application."""

from django.shortcuts import get_object_or_404
from django.views import generic
from django.http import JsonResponse, Http404

from general.templatetags.render_html_field import render_html_with_static

from .models import Chapter, ChapterSection, GlossaryTerm


class IndexView(generic.ListView):
    """View for the chapters application homepage."""

    template_name = "chapters/index.html"
    context_object_name = "all_chapters"

    def get_queryset(self):
        """Get queryset of all chapters.

        Returns:
            Queryset of Chapter objects ordered by name.
        """
        return Chapter.objects.order_by("number")

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        chapter_sections = ChapterSection.objects.all()
        for chapter in self.object_list:
            chapter.first_section = chapter_sections.get(
                chapter=chapter,
                number=1
            )
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


class ChapterView(generic.DetailView):
    """View for intro section of a chapter."""

    model = Chapter
    template_name = "chapters/chapter_index.html"
    context_object_name = "chapter"

    def get_object(self, **kwargs):
        return get_object_or_404(
            self.model.objects.select_related(),
            slug=self.kwargs.get("chapter_slug", None)
        )

    def get_context_data(self, **kwargs):
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
        return get_object_or_404(
            self.model.objects.select_related(),
            slug=self.kwargs.get("chapter_section_slug", None),
            chapter__slug=self.kwargs.get("chapter_slug", None)
        )

    def get_context_data(self, **kwargs):
        context = super(ChapterSectionView, self).get_context_data(**kwargs)
        current_section_number = self.object.number
        context["previous_section"] = ChapterSection.objects.filter(
            chapter=self.object.chapter,
            number=current_section_number - 1
        )[0]
        context["next_section"] = ChapterSection.objects.filter(
            chapter=self.object.chapter,
            number=current_section_number + 1
        )
        context["chapter"] = self.object.chapter
        return context


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
