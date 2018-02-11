"""Context processor for displaying chapters in nav bar."""

from chapters.models import Chapter, ChapterSection


def nav_context(context):
    """Query database for chapter objects.

    Returns:
        Dictionary containing list of chapter objects
    """
    chapters = Chapter.objects.all()
    # Add first chapter section to each chapter
    chapter_sections = ChapterSection.objects.all()
    for chapter in chapters:
        chapter.first_section = chapter_sections.get(
            chapter=chapter,
            number=1
        )
    return {'chapters': chapters}
