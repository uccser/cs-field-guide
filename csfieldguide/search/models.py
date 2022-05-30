"""Models for the search application."""

from django.db import models
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex


class SearchItem(models.Model):
    """Model for item in search index."""

    # Type/class of search item, and human readable name
    object_type = models.CharField(max_length=300)
    object_type_name = models.CharField(max_length=300)
    # Language of search item
    language = models.CharField(max_length=10)
    # HTML to show as preview (to minimise querys at request)
    result_preview = models.TextField(default="")
    # Value to add on top of search value to prioritise specific types
    boost = models.FloatField()
    # Value to store base order of entries when no query given
    order = models.PositiveSmallIntegerField()
    search_vector = SearchVectorField(null=True)

    class Meta:
        """Meta options for model."""

        ordering = ['order']
        indexes = [
            GinIndex(fields=['search_vector'])
        ]
