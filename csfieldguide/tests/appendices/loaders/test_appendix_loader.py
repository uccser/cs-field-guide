import os.path
from unittest import mock
from tests.BaseTestWithDB import BaseTestWithDB
from tests.appendices.AppendicesTestDataGenerator import AppendicesTestDataGenerator
from appendices.management.commands._AppendicesLoader import AppendicesLoader
from django.test import override_settings

from appendices.models import Appendix


class AppendicesLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = AppendicesTestDataGenerator()
        self.loader_name = "appendices"
        self.base_path = os.path.join(
            self.test_data.LOADER_ASSET_PATH, self.loader_name
        )

    @override_settings(ROOT_URLCONF="tests.appendices.loaders.assets.urls")
    def test_appendices_appendix_loader_single_appendix(self):
        test_slug = "appendix-1"
        factory = mock.Mock()
        chapter_loader = AppendicesLoader(
            factory,
            content_path=test_slug,
            base_path=self.base_path,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_loader.load()
        self.assertQuerysetEqual(
            Appendix.objects.all(), ["<Appendix: Appendix 1>"], transform=repr
        )


# Todo: Add tests for invalid appendices.
