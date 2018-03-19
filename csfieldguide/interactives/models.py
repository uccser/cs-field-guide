"""Models for the interactives application."""

from django.db import models
from utils.TranslatableModel import TranslatableModel


class Interactive(TranslatableModel):
    """Model for interactive in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    template = models.CharField(max_length=150)

    def __str__(self):
        """Text representation of Interactive object.

        Returns:
            Name attribute of Interactive (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of interactives."""

        ordering = ["name"]
