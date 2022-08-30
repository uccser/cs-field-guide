"""Tests for get_git_sha in utils module."""

import os
from unittest import mock
from django.test import TestCase
from utils.get_git_sha import get_git_sha


class GetGitSHATest(TestCase):
    """Test class for get_git_sha in utils module."""

    @mock.patch.dict(os.environ, {
        "GIT_SHA": "abcdefg12345678"
    })
    def test_get_git_sha_deployed(self):
        self.assertEqual(
            get_git_sha(),
            "abcdefg12345678",
        )

    def test_get_git_sha_local(self):
        self.assertEqual(
            get_git_sha(),
            "local development",
        )
