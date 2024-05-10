"""Custom loader for loading a chapter section."""

from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from utils.language_utils import get_default_language
from utils.check_required_files import check_interactives


class ChapterSectionsLoader(TranslatableModelLoader):
    """Custom loader for loading chapter sections."""

    extra_converter_templates_directory = "chapter-section"

    def __init__(self, factory, chapter, **kwargs):
        """Create the loader for loading chapter sections.

        Args:
            factory: LoaderFactory object for creating loaders (LoaderFactory).
            chapter: Object of related chapter model (Chapter).
        """
        super().__init__(**kwargs)
        self.factory = factory
        self.chapter = chapter

    @transaction.atomic
    def load(self):
        """Load the content for a section.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        chapter_sections_structure = self.load_yaml_file(self.structure_file_path)
        next_section_number = 1
        used_slugs = set()

        for (section_slug, section_structure) in chapter_sections_structure.items():
            if section_structure is None:
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    ["section-number"],
                    "ChapterSection"
                )

            section_number = section_structure.get("section-number", None)
            if section_number is None:
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    ["section-number"],
                    "ChapterSection"
                )
            if isinstance(section_number, int) is False:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "section-number - value '{}' is invalid".format(section_number),
                    "section-number must be an integer value."
                )
            if section_number != next_section_number:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "section-number - value '{}' is invalid".format(section_number),
                    "section-numbers must be in sequential order. The next expected number was '{}'."
                        .format(next_section_number)
                )

            next_section_number += 1

            chapter_section_translations = self.get_blank_translation_dictionary()

            content_filename = "{}.md".format(section_slug)
            content_translations = self.get_markdown_translations(content_filename)
            for language, content in content_translations.items():
                chapter_section_translations[language]["content"] = content.html_string
                chapter_section_translations[language]["name"] = content.title

            # Override slug. Useful when macrons or other special chars wanted in slug.
            new_slug = section_structure.get("slug", None)
            if new_slug:
                if new_slug == section_slug:
                    raise InvalidYAMLValueError(
                        self.structure_file_path,
                        f"slug - value {new_slug} is invalid.",
                        f"Must be different from default slug {section_slug}."
                    )
                if new_slug in used_slugs:
                    raise InvalidYAMLValueError(
                        self.structure_file_path,
                        f"slug - value {new_slug} is invalid.",
                        f"Must be unique, {new_slug} has already been used."
                    )
                section_slug = new_slug
                used_slugs.add(section_slug)

            chapter_section, created = self.chapter.chapter_sections.update_or_create(
                number=section_number,
                defaults={
                    'slug': section_slug,
                    'languages': list(content_translations.keys()),
                }
            )

            self.populate_translations(chapter_section, chapter_section_translations)
            self.mark_translation_availability(chapter_section, required_fields=["name", "content"])

            chapter_section.save()

            if created:
                term = 'Created'
            else:
                term = 'Updated'
            self.log(f'{term} chapter section: {chapter_section.name}', 1)

            check_interactives(
                content_translations[get_default_language()].required_files["interactives"],
                self.structure_file_path,
                self.chapter,
            )

            # Save chapter section headings
            self.factory.create_chapter_section_heading_loader(
                chapter_section,
                content_translations,
                base_path=self.base_path,
                structure_filename=self.structure_file_path,
            ).load()

        self.chapter.chapter_sections.filter(number__gte=next_section_number).delete()
