"""Module for the testing custom Django rebuild_search_indexes commands."""

from tests.BaseTestWithDB import BaseTestWithDB
from django.core import management
from django.test import tag
from search.management.commands.rebuild_search_indexes import get_instance_index_contents

CHAPTERS_PATH = "tests/chapters/management/assets/"


class TestClassWithoutIndexContentsMethod():

    pass


@tag("management")
class RebuildSearchIndexesCommandTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_rebuild_search_indexes_valid(self):
        management.call_command("rebuild_search_indexes")

    def test_class_without_required_method(self):
        invalid_object = TestClassWithoutIndexContentsMethod()
        self.assertRaises(
            Exception,
            get_instance_index_contents,
            invalid_object,
        )
