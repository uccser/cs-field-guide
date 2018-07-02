"""Module for custom search form."""
from django import forms
from haystack.forms import ModelSearchForm


class CustomSearchForm(ModelSearchForm):
    """Class for custom search form."""

    curriculum_areas = forms.ModelMultipleChoiceField(
        queryset=CurriculumArea.objects.all(),
        required=False,
        widget=None,
    )

    def search(self):
        """Search index based off query.

        This method overrides the default ModelSearchForm search method to
        modify the default result if a blank query string is given. The form
        returns all items instead of zero items if a blank string is given.

        The original search method checks if the form is valid, however
        with all fields being optional with no validation, the form is always
        valid. Therefore logic for an invalid form is removed.

        Returns:
            SearchQuerySet of search results.
        """
        if not self.cleaned_data.get('q'):
            search_query_set = all_items(self.searchqueryset.all())
        else:
            search_query_set = self.searchqueryset.auto_query(self.cleaned_data['q'])

        search_query_set = search_query_set.models(*self.get_models())

        return search_query_set


def all_items(searchqueryset):
    """Return all items of SearchQuerySet.

    Args:
        searchqueryset (SearchQuerySet): QuerySet of search items.

    Returns:
        All items in index.
    """
    return searchqueryset.all()
