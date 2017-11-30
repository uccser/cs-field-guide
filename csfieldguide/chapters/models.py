"""Models for the chapters application."""

from django.db import models


class GlossaryTerm(models.Model):
    """Model for glossary term in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    term = models.CharField(max_length=200, unique=True, null=True)
    definition = models.TextField()

    def __str__(self):
        """Text representation of GlossaryTerm object.

        Returns:
            Term attribute of GlossaryTerm (str).
        """
        return self.term


class Chapter(models.Model):
    """Model for chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    content = models.TextField()
    other_resources = models.TextField(null=True)
    icon = models.CharField(max_length=100, null=True)

    def __str__(self):
        """Text representation of Chapter object.

        Returns:
            Name of chapter (str).
        """
        return self.name
