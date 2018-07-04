"""Module for custom search view."""

from haystack.generic_views import SearchView
from search.forms import CustomSearchForm


class CustomSearchView(SearchView):
    """View for custom search."""

    form_class = CustomSearchForm

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
