"""Search index for appendix models."""

from haystack import indexes
from lxml.html import fromstring
from lxml.cssselect import CSSSelector
from django.template.loader import render_to_string
from django.template.exceptions import TemplateSyntaxError
from appendices.models import (
    Appendix,
    Subappendix,
)
CONTENT_NOT_FOUND_ERROR_MESSAGE = ("Appendix page requires content wrapped in "
                                   "an element with ID 'general-page-content'")


class AppendixIndex(indexes.SearchIndex, indexes.Indexable):
    """Search index for Appendix model."""

    text = indexes.CharField(document=True)

    def prepare(self, obj):
        """Set boost of Appendix model for index.

        Args:
            obj (Appendix): Appendix object.

        Returns:
            Dictionary of data.
        """
        data = super(AppendixIndex, self).prepare(obj)
        data["_boost"] = 1
        return data

    def prepare_text(self, obj):
        """Return text for indexing.

        Args:
            obj (Appendix): Object for indexing.

        Returns:
            String for indexing.
        """
        return get_content(obj)

    def get_model(self):
        """Return the Appendix model.

        Returns:
            Appendix object.
        """
        return Appendix


class SubappendixIndex(indexes.SearchIndex, indexes.Indexable):
    """Search index for Subappendix model."""

    text = indexes.CharField(document=True)

    def prepare(self, obj):
        """Set boost of Subappendix model for index.

        Args:
            obj (Subappendix): Appendix object.

        Returns:
            Dictionary of data.
        """
        data = super(SubappendixIndex, self).prepare(obj)
        data["_boost"] = 0.8
        return data

    def prepare_text(self, obj):
        """Return text for indexing.

        Args:
            obj (Subappendix): Object for indexing.

        Returns:
            String for indexing.
        """
        return get_content(obj)

    def get_model(self):
        """Return the Subappendix model.

        Returns:
            Subappendix object.
        """
        return Subappendix


def get_content(obj):
    """Return content for indexing.

    Args:
        obj: Object for indexing.

    Returns:
        String for indexing.
    """
    rendered = render_to_string(obj.template, {"LANGUAGE_CODE": "en"})
    html = fromstring(rendered)
    selector = CSSSelector("#content-container")
    try:
        contents = selector(html)[0].text_content()
    except IndexError:
        raise TemplateSyntaxError(CONTENT_NOT_FOUND_ERROR_MESSAGE)
    return contents
