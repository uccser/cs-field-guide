"""Test class for other respository tests."""

import os.path
import json
import glob
from django.test import SimpleTestCase


class RepositoryTests(SimpleTestCase):
    """Test class for tests for other areas of the project repository."""

    def test_package_json_includes_all_modules(self):
        """Check if all 'package.json' files are listed in the root 'package.json' file."""
        ROOT_PACKAGE_JSON = "package.json"
        PATH_PREFIX = "file:./"
        IGNORE_FILES = [
            "static/interactives/caesar-cipher/package.json",
            "static/interactives/unicode-binary/package.json",
        ]

        with open(ROOT_PACKAGE_JSON) as f:
            data = json.load(f)
        dependency_data = data["dependencies"]
        listed_files = set()
        for dependency_path in dependency_data.values():
            listed_files.add(dependency_path[len(PATH_PREFIX):])

        for filepath in glob.iglob("static/**/package.json", recursive=True):
            if filepath not in IGNORE_FILES:
                package_path = os.path.dirname(filepath) + os.path.sep
                self.assertIn(
                    os.path.dirname(filepath) + os.path.sep,
                    listed_files,
                    msg="'{}' could not be found in top level '{}' file".format(
                        PATH_PREFIX + package_path,
                        ROOT_PACKAGE_JSON
                    )
                )
