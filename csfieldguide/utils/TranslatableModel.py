"""Module for TranslatableModel abstract base class."""

from django.db import models
from django.utils.translation import get_language
from django.contrib.postgres.fields import ArrayField
from django.db.models import Q


class TranslatedModelManager(models.Manager):
    """Model manager for requesting all objects that have been translated into the current language."""

    def get_queryset(self):
        """Get query set for translated objects."""
        return super().get_queryset().filter(
            Q(languages__contains=[get_language()])
        )


class UntranslatedModelManager(models.Manager):
    """Model manager for requesting all objects that have not been translated into the current language."""

    def get_queryset(self):
        """Get query set for untranslated objects."""
        return super().get_queryset().filter(
            ~Q(languages__contains=[get_language()])
        )


class TranslatableModel(models.Model):
    """Abstract base class for models needing to store list of available languages."""

    languages = ArrayField(models.CharField(max_length=10), default=list)

    objects = models.Manager()
    translated_objects = TranslatedModelManager()
    untranslated_objects = UntranslatedModelManager()

    class Meta:
        """Mark class as abstract."""

        abstract = True

    @property
    def translation_available(self):
        """Check if model content is available in current language."""
        return get_language() in self.languages
