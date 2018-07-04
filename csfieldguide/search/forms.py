"""Module for custom search form."""

from haystack.forms import ModelSearchForm


class CustomSearchForm(ModelSearchForm):
    """Class for custom search form."""

    def search(self):
        """Search index based off query.

        This method overrides the default ModelSearchForm search method to
        modify the default result if a blank query string is given. The form
        returns all items instead of zero items any parameter is given.

        The original search method checks if the form is valid, however
        with all fields being optional with no validation, the form is always
        valid. Therefore logic for an invalid form is removed.

        Returns:
            SearchQuerySet of search results.
        """
        if not self.cleaned_data.get("q") and not self.cleaned_data.get("models"):
            return self.no_query_found()
        else:
            search_query_set = all_items(self.searchqueryset)
        search_query_set = search_query_set.auto_query(self.cleaned_data['q']).models(*self.get_models())
        return search_query_set


def all_items(searchqueryset):
    """Return all items of SearchQuerySet.

    Args:
        searchqueryset (SearchQuerySet): QuerySet of search items.

    Returns:
        All items in index.
    """
    return searchqueryset.all()
