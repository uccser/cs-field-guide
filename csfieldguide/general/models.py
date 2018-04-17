"""Models for the general application."""

from django.db import models
from interactives.models import Interactive
from django.core.exceptions import ValidationError
from utils.TranslatableModel import TranslatableModel


class GeneralPage(TranslatableModel):
    """Model for page in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField(unique=True)
    template = models.CharField(max_length=100)

    def __str__(self):
        """Text representation of GeneralPage object.

        Returns:
            Name of page (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of pages."""

        ordering = ["number"]


class GeneralSubpage(TranslatableModel):
    """Model for each subpage in a page in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    template = models.CharField(max_length=100)
    parent_page = models.ForeignKey(
        GeneralPage,
        null=False,
        related_name="subpages"
    )

    def __str__(self):
        """Text representation of Subpage object.

        Returns:
            Name of subpage (str).
        """
        return "{} - {}".format(self.parent_page.name, self.name)

    class Meta:
        """Set consistent ordering of subpages."""

        ordering = ["name"]
