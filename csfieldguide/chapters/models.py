"""Models for the chapters application."""

from django.db import models
from interactives.models import Interactive
from django.core.exceptions import ValidationError
from utils.TranslatableModel import TranslatableModel
from django.urls import reverse


class GlossaryTerm(TranslatableModel):
    """Model for glossary term in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    term = models.CharField(max_length=200, unique=True)
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


class Chapter(TranslatableModel):
    """Model for chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField(unique=True)
    introduction = models.TextField(default="")
    icon = models.CharField(max_length=100)
    interactives = models.ManyToManyField(
        Interactive,
        related_name="chapter",
    )
    video = models.URLField(blank=True)

    def __str__(self):
        """Text representation of Chapter object.

        Returns:
            Name of chapter (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of chapters."""

        ordering = ["number"]
        verbose_name = "Chapter"
        verbose_name_plural = "Chapters"

    def get_absolute_url(self):
        """Get absolute URL of Chapter object."""
        return reverse('chapters:chapter', args=[self.slug])


class ChapterSection(TranslatableModel):
    """Model for each section in a chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField()
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField()
    content = models.TextField(default="")
    chapter = models.ForeignKey(
        Chapter,
        null=False,
        related_name="chapter_sections",
        on_delete=models.CASCADE
    )

    def __str__(self):
        """Text representation of ChapterSection object.

        Returns:
            Heading of chapter section (str).
        """
        return self.name

    def clean(self):
        """Use to check for unique section numbers.

        Raises:
            ValidationError: when the section being added uses
                an existing section number for this chapter.
        """
        # get all sections with same section number and chapter as new section being added
        sections = ChapterSection.objects.filter(number=self.number, chapter=self.chapter)
        # if already exists section with same number in same chapter, then throw error!
        if len(sections) > 1:
            raise ValidationError(('Section number must be unique per chapter.'))

    def save(self, *args, **kwargs):
        """Override save method to validate unique section numbers."""
        super(ChapterSection, self).save(*args, **kwargs)
        self.clean()

    class Meta:
        """Set consistent ordering of chapter sections."""

        ordering = ["number"]
        verbose_name = "Chapter section"
        verbose_name_plural = "Chapter sections"

    def get_absolute_url(self):
        """Get absolute URL of ChapterSection object."""
        return reverse(
            'chapters:chapter_section',
            kwargs={
                'chapter_slug': self.chapter.slug,
                'chapter_section_slug': self.slug
            }
        )


class ChapterSectionHeading(models.Model):
    """Model for each heading in a chapter section in database.

    See reasoning for model structure in _ChapterSectionHeadingsLoader.py.
    """

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(max_length=300)
    name = models.CharField(max_length=300, default="")
    language = models.CharField(max_length=10, default="")
    number = models.PositiveSmallIntegerField()
    chapter_section = models.ForeignKey(
        ChapterSection,
        null=False,
        related_name="headings",
        on_delete=models.CASCADE
    )

    def __str__(self):
        """Text representation of ChapterSectionHeading object.

        Returns:
            Heading of chapter section heading (str).
        """
        return self.name

    def get_absolute_url(self):
        """Get absolute URL of ChapterSectionHeading object."""
        url = reverse(
            'chapters:chapter_section',
            kwargs={
                "chapter_slug": self.chapter_section.chapter.slug,
                "chapter_section_slug": self.chapter_section.slug
            }
        )
        return "{}#{}".format(url, self.slug)

    class Meta:
        """Set consistent ordering of chapter section headings."""

        ordering = ["number"]
        verbose_name = "Chapter section heading"
        verbose_name_plural = "Chapter sections headings"
