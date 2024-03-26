import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from tests.appendices.AppendicesTestDataGenerator import AppendicesTestDataGenerator
from appendices.management.commands._AppendicesLoader import AppendicesLoader

from appendices.models import Appendix
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.EmptyMarkdownFileError import EmptyMarkdownFileError
from utils.errors.KeyNotFoundError import KeyNotFoundError


class AppendicesLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = AppendicesTestDataGenerator()
        self.loader_name = "appendices"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)

    def test_appendices_appendix_loader_single_appendix(self):
        test_slug = "appendix-1"
        factory = mock.Mock()
        chapter_loader = AppendicesLoader(
            factory,
            content_path=test_slug,
            base_path=self.base_path,
            structure_filename="{}.yaml".format(test_slug)
        )
        chapter_loader.load()
        self.assertQuerysetEqual(
            Appendix.objects.all(),
            ["<Appendix: Appendix 1>"],
            transform=repr
        )
        self.assertSetEqual(
            set(["en"]),
            set(Appendix.objects.get(slug="appendix-1").languages)
        )

    # def test_chapters_chapter_loader_introduction_missing_heading(self):
    #     test_slug = "missing-heading"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     self.assertRaises(
    #         NoHeadingFoundInMarkdownFileError,
    #         chapter_loader.load
    #     )

    # def test_chapters_chapter_loader_introduction_missing_content(self):
    #     test_slug = "missing-content"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     self.assertRaises(
    #         EmptyMarkdownFileError,
    #         chapter_loader.load
    #     )

    # def test_chapters_chapter_loader_missing_sections(self):
    #     test_slug = "missing-sections"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     self.assertRaises(
    #         MissingRequiredFieldError,
    #         chapter_loader.load
    #     )

    # def test_chapters_chapter_loader_no_icon(self):
    #     test_slug = "no-icon"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     self.assertRaises(
    #         MissingRequiredFieldError,
    #         chapter_loader.load
    #     )

    # def test_chapters_chapter_loader_interactive(self):
    #     test_slug = "interactives"
    #     factory = mock.Mock()
    #     interactive1 = self.interactives_test_data.create_interactive(1)
    #     interactive2 = self.interactives_test_data.create_interactive(2)
    #     interactive3 = self.interactives_test_data.create_interactive(3)
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     chapter_loader.load()
    #     self.assertQuerysetEqual(
    #         Chapter.objects.all(),
    #         ["<Chapter: Interactives>"],
    #         transform=repr
    #     )
    #     self.assertEqual(
    #         list(Chapter.objects.get(slug=test_slug).interactives.order_by("slug")),
    #         [
    #             interactive1,
    #             interactive2,
    #             interactive3,
    #         ]
    #     )

    # def test_chapters_chapter_loader_interactive_invalid(self):
    #     test_slug = "invalid-interactive"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     self.assertRaises(
    #         KeyNotFoundError,
    #         chapter_loader.load
    #     )

    # def test_chapters_chapter_loader_valid_video_url(self):
    #     test_slug = "valid-video-url"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     chapter_loader.load()
    #     self.assertEqual(
    #         Chapter.objects.get(slug=test_slug).video,
    #         "https://player.vimeo.com/video/58336187"
    #     )

    # def test_chapters_chapter_loader_invalid_video_url(self):
    #     test_slug = "invalid-video-url"
    #     factory = mock.Mock()
    #     chapter_loader = ChaptersLoader(
    #         factory,
    #         chapter_number=1,
    #         content_path=test_slug,
    #         base_path=self.base_path,
    #         structure_filename="{}.yaml".format(test_slug)
    #     )
    #     self.assertRaises(
    #         ValueError,
    #         chapter_loader.load
    #     )
