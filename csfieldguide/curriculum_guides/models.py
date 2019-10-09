"""Models for the curriculum guides application."""

from django.db import models
from django.core.exceptions import ValidationError
from utils.TranslatableModel import TranslatableModel
from django.urls import reverse


class CurriculumGuide(TranslatableModel):
    """Model for curriculum guide in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField(unique=True)
    introduction = models.TextField(default="")

    def __str__(self):
        """Text representation of CurriculumGuide object.

        Returns:
            Name of curriculum guide (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of curriculum guides."""

        ordering = ["number"]
        verbose_name = "Curriculum Guide"
        verbose_name_plural = "Curriculum Guides"

    def get_absolute_url(self):
        """Get absolute URL of CurriculumGuide object."""
        return reverse('curriculum_guides:curriculum_guide', args=[self.slug])


class CurriculumGuideSection(TranslatableModel):
    """Model for each section in a curriculum guide in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField()
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField()
    content = models.TextField(default="")
    curriculum_guide = models.ForeignKey(
        CurriculumGuide,
        null=False,
        related_name="curriculum_guide_sections",
        on_delete=models.CASCADE
    )

    def __str__(self):
        """Text representation of CurriculumGuideSection object.

        Returns:
            Heading of curriculum guide section (str).
        """
        return self.name

    def clean(self):
        """Use to check for unique section numbers.

        Raises:
            ValidationError: when the section being added uses
                an existing section number for this curriculum guide.
        """
        # get all sections with same section number and curriculum guide as new section being added
        sections = CurriculumGuideSection.objects.filter(number=self.number, curriculum_guide=self.curriculum_guide)
        # if already exists section with same number in same curriculum guide, then throw error!
        if len(sections) > 1:
            raise ValidationError(('Section number must be unique per curriculum guide.'))

    def save(self, *args, **kwargs):
        """Override save method to validate unique section numbers."""
        super(CurriculumGuideSection, self).save(*args, **kwargs)
        self.clean()

    class Meta:
        """Set consistent ordering of curriculum guide sections."""

        ordering = ["number"]
        verbose_name = "Curriculum Guide section"
        verbose_name_plural = "Curriculum Guide sections"

    def get_absolute_url(self):
        """Get absolute URL of CurriculumGuideSection object."""
        return reverse(
            'curriculum_guide_sections:curriculum_guide_section',
            kwargs={
                'curriculum_guide_slug': self.curriculum_guide.slug,
                'curriculum_guide_section_slug': self.slug
            }
        )
