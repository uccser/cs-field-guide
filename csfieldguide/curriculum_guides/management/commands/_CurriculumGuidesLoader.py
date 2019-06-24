"""Custom loader for loading a curriculum guide."""

import os.path
from django.db import transaction
from utils.TranslatableModelLoader import TranslatableModelLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from curriculum_guides.models import CurriculumGuide


class CurriculumGuidesLoader(TranslatableModelLoader):
    """Custom loader for loading curriculum guides."""

    extra_converter_templates_directory = "curriculum-guide"

    def __init__(self, factory, curriculum_guide_number, **kwargs):
        """Create the loader for loading a CurriculumGuide.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
        """
        super().__init__(**kwargs)
        self.factory = factory
        self.curriculum_guide_slug = self.content_path
        self.curriculum_guide_number = curriculum_guide_number

    @transaction.atomic
    def load(self):
        """Load the content for a curriculum guide.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        curriculum_guide_structure = self.load_yaml_file(self.structure_file_path)

        sections = curriculum_guide_structure.get("sections", None)
        if sections is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["sections"],
                "CurriculumGuide"
            )

        curriculum_guide_translations = self.get_blank_translation_dictionary()

        introduction_filename = "{}.md".format(self.curriculum_guide_slug)
        introduction_translations = self.get_markdown_translations(introduction_filename)
        for language, content in introduction_translations.items():
            curriculum_guide_translations[language]["introduction"] = content.html_string
            curriculum_guide_translations[language]["name"] = content.title

        # Create curriculum guide object and save to the db
        curriculum_guide = CurriculumGuide(
            slug=self.curriculum_guide_slug,
            number=self.curriculum_guide_number,
        )

        self.populate_translations(curriculum_guide, curriculum_guide_translations)
        self.mark_translation_availability(curriculum_guide, required_fields=["name", "introduction"])
        curriculum_guide.save()

        self.log("Added curriculum guide: {}".format(curriculum_guide.name))

        # Load curriculum guide sections
        content_path, structure_filename = os.path.split(sections)
        self.factory.create_curriculum_guide_section_loader(
            curriculum_guide,
            base_path=self.base_path,
            content_path=os.path.join(self.content_path, content_path),
            structure_filename=structure_filename
        ).load()
