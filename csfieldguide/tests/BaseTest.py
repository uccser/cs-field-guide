"""Base test class with methods implemented for Django testing."""

from django.test import SimpleTestCase
from django.test.client import Client
from django.utils.translation import activate


class BaseTest(SimpleTestCase):
    """Base test class with methods implemented for Django testing."""

    def __init__(self, *args, **kwargs):
        """Create the BaseTest object by calling the parent's constructor."""
        super().__init__(*args, **kwargs)
        self.language = None

    @classmethod
    def setUpClass(cls):
        """Automatically called before tests in class."""
        super(BaseTest, cls).setUpClass()

    @classmethod
    def tearDownClass(cls):
        """Automatically called after each test."""
        super(BaseTest, cls).tearDownClass()

    def setUp(self):
        """Automatically called before each test.

        Sets the language if specified and creates a new client.
        """
        if self.language is not None:
            activate(self.language)
        self.client = Client()

    def tearDown(self):
        """Automatically called after each test.

        Deletes test user.
        """
        pass
