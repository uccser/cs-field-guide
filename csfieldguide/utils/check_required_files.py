"""Module for checking required files found within Markdown conversions."""

from django.contrib.staticfiles import finders
from django.core.exceptions import ObjectDoesNotExist
from interactives.models import Interactive
from utils.errors.CouldNotFindImageError import CouldNotFindImageError
from utils.errors.KeyNotFoundError import KeyNotFoundError


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
    for image in images:
        if not finders.find(image):
            raise CouldNotFindImageError(image, md_file_path)


def check_interactives(interactives, file_path, chapter=None):
    """Check interactives are available.

    If chapter is given, each interactive has a relationship added
    to the chapter.

    Args:
        interactives (set): Set of slugs of interactives.
        file_path (str): File path of file providing interactives.
                            Used when displaying error message.
        chapter (Chapter): Chapter to add relationship to interactive too.

    Raises:
        KeyNotFoundError: If interactive cannot be found.
    """
    for interactive_slug in interactives:
        try:
            interactive = Interactive.objects.get(slug=interactive_slug)
        except ObjectDoesNotExist:
            raise KeyNotFoundError(
                file_path,
                interactive_slug,
                "Interactive"
            )
        if chapter:
            chapter.interactives.add(interactive)
