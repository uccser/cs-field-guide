"""Views for the chapters application."""

from django.views import generic
from django.http import HttpResponse

from .models import Chapter

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