"""Module for checking required files found within Markdown conversions."""

import os
import os.path
from django.contrib.staticfiles import finders
from django.conf import settings
from utils.errors.CouldNotFindImageError import CouldNotFindImageError


def find_image_files(images, md_file_path):
    """Confirm each image is in static folder.

    Args:
        images: image file names (set).
        md_file_path: path to Markdown file (str).

    Raises:
        CouldNotFindImageError: when image file cannot be found.
    """
    for image in images:
        if not finders.find(image):
            raise CouldNotFindImageError(image, md_file_path)
