"""Module for custom search view."""

from haystack.generic_views import SearchView
from haystack.query import EmptySearchQuerySet


class CustomSearchView(SearchView):
    """View for custom search."""

    # def get_queryset(self):
    #     """Return the list of items for this view.
    #
    #     This method overrides the default method, as all items were being
    #     returned when no query parameters was given (not a blank query).
    #
    #     Returns:
    #         QuerySet for view.
    #     """
    #     if self.request.GET:
    #         return super(CustomSearchView, self).get_queryset()
    #     else:
    #         return EmptySearchQuerySet()

    def get_context_data(self, *args, **kwargs):
        """Return context dictionary for custom search view.

        Returns:
            Dictionary of context values.
        """
        context = super(CustomSearchView, self).get_context_data(*args, **kwargs)
        context["search"] = bool(self.request.GET)

        # Model filter
        selected_models = self.request.GET.getlist("models")
        models_tuples = context["form"].fields["models"].choices
        models = []
        for (model_value, model_name) in models_tuples:
            model_data = {
                "value": model_value,
                "name": model_name,
            }
            if model_value in selected_models:
                model_data["selected"] = "true"
            models.append(model_data)
        context["models"] = models

        for result in context["object_list"]:
            print(result)

        return context
