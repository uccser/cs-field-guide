"""Mock TranslatableModel for testing TranslatableModel functionality."""

from django.db import models
from utils.TranslatableModel import TranslatableModel


class MockTranslatableModel(TranslatableModel):
    """Mock TranslatableModel for testing TranslatableModel functionality."""

    name = models.CharField(max_length=1, default="")

    def __str__(self):
        """Return name of MockTranslatableModel."""
        return self.name
