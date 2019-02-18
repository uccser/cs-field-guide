"""Models for the interactives application."""

from django.db import models
from django.utils.translation import ugettext_lazy as _
from utils.TranslatableModel import TranslatableModel


class Interactive(TranslatableModel):
    """Model for interactive in database."""

    MODEL_NAME = _("Interactive")

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    template = models.CharField(max_length=150)
    is_interactive = models.BooleanField(default=True)

    def __str__(self):
        """Text representation of Interactive object.

        Returns:
            Name attribute of Interactive (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of interactives."""

        ordering = ["name"]
