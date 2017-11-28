"""Module for checking required files found within Markdown conversions."""

import os
import os.path
from django.contrib.staticfiles import finders
from django.conf import settings
from utils.errors.CouldNotFindImageError import CouldNotFindImageError


def check_converter_required_files(required_files, md_file_path):
    """Process data within required files found by Markdown converter.

    Args:
        required_files: Dictionary of required files data (dict).
    """
    find_image_files(required_files["images"], md_file_path)

def find_image_files(images, md_file_path):
    """Confirm each image is in static folder.

    Args:
        images: image file names (set).
        md_file_path: path to Markdown file (str).

    Raises:
        CouldNotFindImageError: when image file cannot be found.
    """
    print(images)
    for image in images:
        if not finders.find(image):
            raise CouldNotFindImageError(image, md_file_path)
