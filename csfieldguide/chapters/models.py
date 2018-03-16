"""Models for the chapters application."""

from django.db import models
<<<<<<< HEAD
from interactives.models import Interactive
=======
from django.core.exceptions import ValidationError
>>>>>>> milestone/django-system


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

    class Meta:
        """Set consistent ordering of Glossary Terms."""

        ordering = ["term"]


class Chapter(models.Model):
    """Model for chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    number = models.SmallIntegerField(unique=True)
    introduction = models.TextField()
    icon = models.CharField(max_length=100)
    interactives = models.ManyToManyField(
        Interactive,
        related_name="chapter",
    )

    def __str__(self):
        """Text representation of Chapter object.

        Returns:
            Name of chapter (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of chapters."""

        ordering = ["number"]


class ChapterSection(models.Model):
    """Model for each section in a chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField()
    heading = models.CharField(max_length=100)
    number = models.SmallIntegerField()
    content = models.TextField()
    chapter = models.ForeignKey(
        Chapter,
        null=False,
        related_name="chapter_section"
    )

    def __str__(self):
        """Text representation of ChapterSection object.

        Returns:
            Heading of chapter section (str).
        """
        return self.heading

    def clean(self):
        """Use to check for unique section numbers.

        Raises:
            ValidationError: when the section being added uses
                an existing section number for this chapter.
        """
        # get all sections with same section number and chapter as new section being added
        sections = ChapterSection.objects.filter(number=self.number, chapter=self.chapter)
        # if already exists section with same number in same chapter, then throw error!
        if len(sections) >= 1:
            raise ValidationError(('Section number must be unique per chapter.'))

    def save(self, *args, **kwargs):
        """Override save method to validate unique section numbers."""
        self.full_clean()
        super(ChapterSection, self).save(*args, **kwargs)

    class Meta:
        """Set consistent ordering of chapter sections."""

        ordering = ["number"]
