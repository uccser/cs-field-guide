"""Search index for chapter models.

Note: Document boosting for Whoosh backend is with keyword '_boost' instead
      of 'boost'.
"""

from haystack import indexes
from chapters.models import (
    Chapter,
    ChapterSection,
)


class ChapterIndex(indexes.SearchIndex, indexes.Indexable):
    """Search index for Chapter model."""

    text = indexes.CharField(document=True, use_template=True)

    def prepare(self, obj):
        """Set boost of Chapter model for index.

        Args:
            obj (Chapter): Chapter object.

        Returns:
            Dictionary of data.
        """
        data = super(ChapterIndex, self).prepare(obj)
        data["_boost"] = 2
        return data

    def get_model(self):
        """Return the Chapter model.

        Returns:
            Chapter object.
        """
        return Chapter


class ChapterSectionIndex(indexes.SearchIndex, indexes.Indexable):
    """Search index for ChapterSection model."""

    text = indexes.CharField(document=True, use_template=True)
    chapter = indexes.CharField(model_attr="chapter")

    def prepare(self, obj):
        """Set boost of ChapterSection model for index.

        Args:
            obj (ChapterSection): ChapterSection object.

        Returns:
            Dictionary of data.
        """
        data = super(ChapterSectionIndex, self).prepare(obj)
        data["_boost"] = 1.2
        return data

    def get_model(self):
        """Return the ChapterSection model.

        Returns:
            ChapterSection object.
        """
        return ChapterSection
