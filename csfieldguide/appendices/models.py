"""Models for the appendices application."""

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from search.utils import get_template_text


class Appendix(models.Model):
    """Model for appendix page in database."""

    MODEL_NAME = _("Appendix")

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    template = models.CharField(max_length=100)
    url_name = models.CharField(max_length=100)

    def get_absolute_url(self):
        """Return the canonical URL for a Appendix.

        Returns:
            URL as string.
        """
        return reverse(self.url_name)

    def __str__(self):
        """Text representation of Appendix object.

        Returns:
            Name of page (str).
        """
        return self.name

    def index_contents(self):
        """Return dictionary for search indexing.

        Returns:
            Dictionary of content for search indexing. The dictionary keys
            are the weightings of content, and the dictionary values
            are strings of content to index.
        """
        return {
            'A': self.name,
            'B': get_template_text(self.template),
        }

    class Meta:
        """Set consistent ordering of appendices."""

        ordering = ["name"]
        verbose_name = _("appendix")
        verbose_name_plural = _("appendices")
