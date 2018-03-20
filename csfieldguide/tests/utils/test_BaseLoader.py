"""Test class for BaseLoader class."""

from django.test import SimpleTestCase
from tests.utils.BareBaseLoader import BareBaseLoader
from utils.errors.InvalidYAMLFileError import InvalidYAMLFileError
import os.path

TEST_ASSET_PATH = "tests/utils/assets/BaseLoader/"


class BaseLoaderTest(SimpleTestCase):
    """Test class for BaseLoader class."""

    def test_load_yaml_file_valid(self):
        loader = BareBaseLoader()
        filename = "yaml-valid.yaml"
        self.assertEqual(
            loader.load_yaml_file(os.path.join(TEST_ASSET_PATH, filename)),
            {"key": "value"}
        )

    def test_load_yaml_file_invalid(self):
        loader = BareBaseLoader()
        filename = "yaml-invalid.yaml"
        self.assertRaises(
            InvalidYAMLFileError,
            loader.load_yaml_file,
            os.path.join(TEST_ASSET_PATH, filename)
        )

    def test_load_yaml_file_invalid_not_dict(self):
        loader = BareBaseLoader()
        filename = "yaml-invalid-not-dict.yaml"
        self.assertRaises(
            InvalidYAMLFileError,
            loader.load_yaml_file,
            os.path.join(TEST_ASSET_PATH, filename)
        )

    def test_load_template_files_single_file(self):
        test_folder = os.path.join(TEST_ASSET_PATH, "valid-templates-single", "")
        with self.settings(CUSTOM_VERTO_TEMPLATES=test_folder):
            loader = BareBaseLoader()
            self.assertEqual(
                loader.load_template_files(),
                {"image": '<img src="{{ file_path }}">\n'}
            )

    def test_load_template_files_multiple_files(self):
        test_folder = os.path.join(TEST_ASSET_PATH, "valid-templates-multiple", "")
        with self.settings(CUSTOM_VERTO_TEMPLATES=test_folder):
            loader = BareBaseLoader()
            self.assertEqual(
                loader.load_template_files(),
                {
                    "image": '<img src="{{ file_path }}">\n',
                    "panel": '<div class="panel"></div>\n'
                }
            )

    def test_load_template_files_zero_files(self):
        test_folder = os.path.join(TEST_ASSET_PATH, "valid-templates-zero", "")
        with self.settings(CUSTOM_VERTO_TEMPLATES=test_folder):
            loader = BareBaseLoader()
            self.assertEqual(
                loader.load_template_files(),
                dict()
            )
