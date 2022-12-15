"""Models for the chapters application."""

from django.db import models
from interactives.models import Interactive
from django.utils.translation import gettext_lazy as _
from utils.TranslatableModel import TranslatableModel
from django.urls import reverse
from search.utils import concat_field_values


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

    def get_absolute_url(self):
        """Get absolute URL of Chapter object."""
        return reverse('chapters:glossary') + f'#{self.slug}'

    def index_contents(self):
        """Return dictionary for search indexing.

        Returns:
            Dictionary of content for search indexing. The dictionary keys
            are the weightings of content, and the dictionary values
            are strings of content to index.
        """
        return {
            'A': self.term,
            'B': self.definition,
        }

    class Meta:
        """Set consistent ordering of Glossary Terms."""

        ordering = ["term"]
        verbose_name = _("glossary term")
        verbose_name_plural = _("glossary terms")


class Chapter(TranslatableModel):
    """Model for chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField()  # This is set unique in the Meta child class
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

    def get_absolute_url(self):
        """Get absolute URL of Chapter object."""
        return reverse('chapters:chapter', args=[self.slug])

    def index_contents(self):
        """Return dictionary for search indexing.

        Returns:
            Dictionary of content for search indexing. The dictionary keys
            are the weightings of content, and the dictionary values
            are strings of content to index.
        """
        return {
            'A': self.name,
            'B': self.introduction,
            'C': concat_field_values(
                self.chapter_sections.values_list('name'),
            ),
            'D': concat_field_values(
                self.interactives.values_list('name'),
                self.chapter_sections.values_list('content'),
            ),
        }

    class Meta:
        """Set consistent ordering of chapters."""

        ordering = ["number"]
        verbose_name = _("chapter")
        verbose_name_plural = _("chapters")

        constraints = [
            models.UniqueConstraint(fields=["slug"], deferrable=models.Deferrable.DEFERRED, name="slug_deferred")
        ]


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

    class Meta:
        """Set consistent ordering of chapter sections."""

        ordering = ["chapter__number", "number"]
        verbose_name = _("chapter section")
        verbose_name_plural = _("chapter sections")

    def get_absolute_url(self):
        """Get absolute URL of ChapterSection object."""
        return reverse(
            'chapters:chapter_section',
            kwargs={
                'chapter_slug': self.chapter.slug,
                'chapter_section_slug': self.slug
            }
        )

    def index_contents(self):
        """Return dictionary for search indexing.

        Returns:
            Dictionary of content for search indexing. The dictionary keys
            are the weightings of content, and the dictionary values
            are strings of content to index.
        """
        return {
            'A': self.name,
            'B': self.content,
            'D': self.chapter.name,
        }


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
