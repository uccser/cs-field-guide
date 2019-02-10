"""Module for the overriden Django Haystack rebuild_index command."""

from haystack.management.commands import rebuild_index
from haystack.query import SearchQuerySet
from search.forms import all_items
from chapters.models import (
    Chapter,
    ChapterSection,
)


class Command(rebuild_index.Command):
    """Command class for the custom Django rebuild_index command."""

    help = "Rebuild search index and check empty query returns all items."

    def handle(self, *args, **options):
        """Automatically called when the rebuild_index command is given."""
        total_objects = Chapter.objects.count()
        total_objects += ChapterSection.objects.count()
        super(Command, self).handle(*args, **options)
        total_results = len(all_items(SearchQuerySet()))
        if total_objects == total_results:
            print("Search index loaded with {} items.".format(total_results))
        else:   # pragma: no cover
            raise Exception("Search all_items() method does not return all items.")
