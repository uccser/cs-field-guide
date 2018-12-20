"""Tests for the get_thumbnail module."""

from django.utils import translation
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from interactives.utils.get_thumbnail import (
    get_thumbnail_base,
    get_thumbnail_filename,
    get_thumbnail_static_path_for_interactive,
)


class GetThumbnailUtilsTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.language = "en"

    def test_get_thumbnail_filename(self):
        self.assertEqual(
            get_thumbnail_filename("slug"),
            "slug.png"
        )

    def test_get_thumbnail_base_en(self):
        self.assertEqual(
            get_thumbnail_base(),
            "build/img/interactives/thumbnails/en/"
        )

    def test_get_thumbnail_base_de(self):
        with translation.override("de"):
            self.assertEqual(
                get_thumbnail_base(),
                "build/img/interactives/thumbnails/de/"
            )

    def test_get_thumbnail_static_path_for_interactive_en(self):
        interactive = self.test_data.create_interactive(1)
        self.assertEqual(
            get_thumbnail_static_path_for_interactive(interactive),
            "build/img/interactives/thumbnails/en/interactive-1.png"
        )

    def test_get_thumbnail_static_path_for_interactive_de(self):
        interactive = self.test_data.create_interactive(1)
        with translation.override("de"):
            self.assertEqual(
                get_thumbnail_static_path_for_interactive(interactive),
                "build/img/interactives/thumbnails/de/interactive-1.png"
            )
