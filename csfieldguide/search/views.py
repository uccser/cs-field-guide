"""Module for search views."""

from itertools import chain
from django.views import generic
from django.db.models import F
from django.contrib.postgres.search import (
    SearchQuery,
    SearchRank,
)
from django.utils.translation import get_language
from search.models import SearchItem
from search.utils import (
    get_model_filter_options,
    updated_model_filter_options,
)
from search.settings import SEARCH_MODEL_TYPES

SEARCH_MODEL_FILTER_VALUES = get_model_filter_options(SEARCH_MODEL_TYPES)


class SearchView(generic.TemplateView):
    """View for search."""

    template_name = 'search/index.html'

    def get_context_data(self, *args, **kwargs):
        """Return context dictionary for search view.

        Returns:
            Dictionary of context values.
        """
        context = super().get_context_data(*args, **kwargs)
        context['models'] = SEARCH_MODEL_FILTER_VALUES

        # Get request query parmaters
        query_text = self.request.GET.get('q')
        selected_models = self.request.GET.getlist('models')
        # selected_curriculum_areas = self.request.GET.getlist('curriculum_areas')
        get_request = bool(self.request.GET)

        if get_request:
            context['search'] = get_request

            results = SearchItem.objects.filter(
                language=get_language()
            )

            if selected_models:
                results = results.filter(object_type__in=selected_models)

            # Search by text query if provided
            if query_text:
                query = SearchQuery(query_text, search_type="websearch")
                results = results.filter(
                    search_vector=query
                ).annotate(
                    rank=SearchRank(
                        F('search_vector'), query
                    ) + F('boost')
                ).filter(
                    rank__gt=0
                ).order_by(
                    '-rank'
                )

            context['query'] = query_text
            context['models'] = updated_model_filter_options(
                SEARCH_MODEL_FILTER_VALUES,
                selected_models,
            )
            context['results'] = results
            context['results_count'] = len(results)
        return context
