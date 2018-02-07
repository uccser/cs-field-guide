"""Add lesson min and max ages to given list of objects."""

from chapters.models import ChapterSection


def add_first_section_to_chapter_objects(objects):
    """
    """
    chapter_sections = ChapterSection.objects.all()
    for item in objects:
        item.first_section = chapter_sections.get(
            chapter=item,
            number=1
        )
        return objects
