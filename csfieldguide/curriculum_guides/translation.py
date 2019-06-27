"""Translation options for localised models.

Utilised by django-modeltranslation. See http://django-modeltranslation.readthedocs.io
"""

from modeltranslation.translator import translator, TranslationOptions
from curriculum_guides.models import (
    CurriculumGuide,
    CurriculumGuideSection,
)


class CurriculumGuideTranslationOptions(TranslationOptions):
    """Translation options for CurriculumGuide model."""

    fields = ("name", "introduction")
    fallback_undefined = {
        "introduction": None,
    }


class CurriculumGuideSectionTranslationOptions(TranslationOptions):
    """Translation options for CurriculumGuideSection model."""

    fields = ("name", "content")
    fallback_undefined = {
        "content": None,
    }


translator.register(CurriculumGuide, CurriculumGuideTranslationOptions)
translator.register(CurriculumGuideSection, CurriculumGuideSectionTranslationOptions)
