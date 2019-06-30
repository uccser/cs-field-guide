"""Views for the curriculum guides application."""

from django.shortcuts import get_object_or_404
from django.core.urlresolvers import resolve, reverse
from django.views import generic
from curriculum_guides.models import (
    CurriculumGuide,
    CurriculumGuideSection,
)


class IndexView(generic.ListView):
    """View for the curriculum guides application homepage."""

    template_name = "curriculum_guides/index.html"
    context_object_name = "curriculum_guides"

    def get_queryset(self):
        """Get queryset of all curriculum guides.

        Returns:
            Queryset of CurriculumGuide objects ordered by name.
        """
        return CurriculumGuide.objects.all()


class CurriculumGuideView(generic.DetailView):
    """View for intro section of a curriculum guide."""

    model = CurriculumGuide
    template_name = "curriculum_guides/curriculum_guide.html"
    context_object_name = "curriculum_guide"
    slug_url_kwarg = "curriculum_guide_slug"

    def get_context_data(self, **kwargs):
        """Provide the context data for the curriculum guide view.

        Returns:
            Dictionary of context data.
        """
        context = super(CurriculumGuideView, self).get_context_data(**kwargs)
        context["curriculum_guide_sections"] = CurriculumGuideSection.objects.filter(
            curriculum_guide__slug=self.object.slug
        )
        return context


class CurriculumGuideSectionView(generic.DetailView):
    """View for a specific section of a curriculum guide."""

    model = CurriculumGuideSection
    template_name = "curriculum_guides/curriculum_guide_section.html"
    context_object_name = "curriculum_guide_section"

    def get_object(self, **kwargs):
        """Retrieve object for the curriculum guide section view.

        Returns:
            CurriculumGuideSection object (CurriculumGuideSection).

        Raises:
           404 error: if object cannot be found.
        """
        return get_object_or_404(
            self.model.objects.select_related(),
            slug=self.kwargs.get("curriculum_guide_section_slug", None),
            curriculum_guide__slug=self.kwargs.get("curriculum_guide_slug", None)
        )

    def get_context_data(self, **kwargs):
        """Provide the context data for the curriculum guide section view.

        Returns:
            Dictionary of context data.
        """
        context = super(CurriculumGuideSectionView, self).get_context_data(**kwargs)
        current_section_number = self.object.number
        context["previous_section"] = CurriculumGuideSection.objects.filter(
            curriculum_guide=self.object.curriculum_guide,
            number=current_section_number - 1
        )
        context["next_section"] = CurriculumGuideSection.objects.filter(
            curriculum_guide=self.object.curriculum_guide,
            number=current_section_number + 1
        )
        context["curriculum_guide"] = self.object.curriculum_guide
        return context


class NCEARedirectView(generic.RedirectView):

    permanent = True
    query_string = True
    pattern_name = "curriculum_guides:curriculum_guide_section"

    def get_redirect_url(self, *args, **kwargs):
        return reverse("curriculum_guides:curriculum_guide", kwargs={"curriculum_guide_slug": "ncea"})
