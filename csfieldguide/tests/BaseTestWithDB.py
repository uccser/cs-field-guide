"""Base test class with methods implemented for Django testing."""

from django.test import TestCase
from django.contrib.auth.models import User
from django.test.client import Client
from django.utils.translation import activate


class BaseTestWithDB(TestCase):
    """Base test class with methods implemented for Django testing."""

    def __init__(self, *args, **kwargs):
        """Create a BaseTestWithDB object."""
        super().__init__(*args, **kwargs)
        self.language = None

    @classmethod
    def setUpTestData(cls):
        """Create data for the whole class.

        Creates a new user.
        """
        super(BaseTestWithDB, cls).setUpTestData()
        cls.username = "test"
        cls.email = "test@test.com"
        cls.password = "test"
        cls.test_user = User.objects.create_user(cls.username, cls.email, cls.password)

    @classmethod
    def setUpClass(cls):
        """Automatically called before tests in class."""
        super(BaseTestWithDB, cls).setUpClass()
        cls.client = Client()

    @classmethod
    def tearDownClass(cls):
        """Automatically called after tests in class."""
        super(BaseTestWithDB, cls).tearDownClass()

    def setUp(self):
        """Automatically called before each test.

        Sets the language if specified, logs into the database
        """
        if self.language is not None:
            activate(self.language)
        login = self.client.login(username=self.username, password=self.password)
        self.assertEqual(login, True)

    def tearDown(self):
        """Automatically called after each test. Deletes the user."""
        pass
