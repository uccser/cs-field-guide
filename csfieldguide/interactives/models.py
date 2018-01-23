"""Models for the interactives application."""

from django.db import models
# from chapters.models import Chapter

# Create your models here.


class Interactive(models.Model):
    """Model for interactive in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    template = models.CharField(max_length=150)
