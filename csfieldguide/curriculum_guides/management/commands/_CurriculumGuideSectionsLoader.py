"""Custom loader for loading a curriculum guide section."""

from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.InvalidYAMLValueError import InvalidYAMLValueError
from utils.language_utils import get_default_language
from utils.check_required_files import check_interactives


class CurriculumGuideSectionsLoader(TranslatableModelLoader):
    """Custom loader for loading curriculum guide sections."""

    extra_converter_templates_directory = "curriculum-guide-section"

    def __init__(self, factory, curriculum_guide, **kwargs):
        """Create the loader for loading curriculum guide sections.

        Args:
            factory: LoaderFactory object for creating loaders (LoaderFactory).
            curriculum_guide: Object of related curriculum guide model (CurriculumGuide).
        """
        super().__init__(**kwargs)
        self.factory = factory
        self.curriculum_guide = curriculum_guide

    @transaction.atomic
    def load(self):
        """Load the content for a section.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        curriculum_guide_sections_structure = self.load_yaml_file(self.structure_file_path)
        section_numbers = []

        for (section_slug, section_structure) in curriculum_guide_sections_structure.items():

            if section_structure is None:
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    ["section-number"],
                    "CurriculumGuideSection"
                )

            section_number = section_structure.get("section-number", None)
            if section_number is None:
                raise MissingRequiredFieldError(
                    self.structure_file_path,
                    ["section-number"],
                    "CurriculumGuideSection"
                )
            if isinstance(section_number, int) is False:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "section-number - value '{}' is invalid".format(section_number),
                    "section-number must be an integer value."
                )

            section_numbers.append(section_number)

            curriculum_guide_section_translations = self.get_blank_translation_dictionary()

            content_filename = "{}.md".format(section_slug)
            content_translations = self.get_markdown_translations(content_filename)
            for language, content in content_translations.items():
                curriculum_guide_section_translations[language]["content"] = content.html_string
                curriculum_guide_section_translations[language]["name"] = content.title

            curriculum_guide_section = self.curriculum_guide.curriculum_guide_sections.create(
                slug=section_slug,
                number=section_number,
                languages=list(content_translations.keys()),
            )

            self.populate_translations(curriculum_guide_section, curriculum_guide_section_translations)
            self.mark_translation_availability(curriculum_guide_section, required_fields=["name", "content"])

            curriculum_guide_section.save()

            self.log("Added curriculum guide section: {}".format(curriculum_guide_section.name), 1)

            check_interactives(
                content_translations[get_default_language()].required_files["interactives"],
                self.structure_file_path,
                self.curriculum_guide,
            )

        # assumes first section number is always 1
        for counter, section_number in enumerate(section_numbers, 1):
            if section_number != counter:
                raise InvalidYAMLValueError(
                    self.structure_file_path,
                    "section-number - value '{}' is invalid".format(section_number),
                    "section-numbers must be in sequential order. The next expected number was '{}'.".format(counter)
                )
