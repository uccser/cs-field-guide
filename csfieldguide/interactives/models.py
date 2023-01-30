"""Models for the interactives application."""

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from utils.TranslatableModel import TranslatableModel
from search.utils import concat_field_values


class Interactive(TranslatableModel):
    """Model for interactive in database."""

    MODEL_NAME = _("Interactive")

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    template = models.CharField(max_length=150)
    is_interactive = models.BooleanField(default=True)
    use_large_thumbnail = models.BooleanField(default=False)

    def __str__(self):
        """Text representation of Interactive object.

        Returns:
            Name attribute of Interactive (str).
        """
        return self.name

    def get_absolute_url(self):
        """Get absolute URL of Chapter object."""
        kwargs = {
            'interactive_slug': self.slug,
        }
        return reverse('interactives:interactive', kwargs=kwargs)

    def index_contents(self):
        """Return dictionary for search indexing.

        Returns:
            Dictionary of content for search indexing. The dictionary keys
            are the weightings of content, and the dictionary values
            are strings of content to index.
        """
        return {
            'A': self.name,
            'C': concat_field_values(
                self.chapter.values_list('name')
            ),
        }

    class Meta:
        """Set consistent ordering of interactives."""

        ordering = ["name"]
        verbose_name = _("interactive")
        verbose_name_plural = _("interactives")
