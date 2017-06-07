# -*- coding: utf-8 -*-
"""Settings for running on continuous integration server."""

from .base import *  # noqa: F403


# DATABASE CONFIGURATION
# ----------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    'default': env.db('DATABASE_URL'),  # noqa: F405
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

# DEBUG
# ----------------------------------------------------------------------------
# Turn debug off so tests run faster
DEBUG = False
TEMPLATES[0]["OPTIONS"]["debug"] = False  # noqa: F405

# SECRET CONFIGURATION
# ----------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Note: This key only used for development and testing.
SECRET_KEY = env("DJANGO_SECRET_KEY", default="l@@)w&&%&u37+sjz^lsx^+29y_333oid3ygxzucar^8o(axo*f")  # noqa: F405

# Mail settings
# ----------------------------------------------------------------------------
EMAIL_HOST = "localhost"
EMAIL_PORT = 1025

# In-memory email backend stores messages in django.core.mail.outbox
# for unit testing purposes
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

# CACHING
# ----------------------------------------------------------------------------
# Speed advantages of in-memory caching without having to run Memcached
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": ""
    }
}

# TESTING
# ----------------------------------------------------------------------------
TEST_RUNNER = "django.test.runner.DiscoverRunner"


# PASSWORD HASHING
# ----------------------------------------------------------------------------
# Use fast password hasher so tests run faster
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

# TEMPLATE LOADERS
# ----------------------------------------------------------------------------
# Keep templates in memory so tests run faster
TEMPLATES[0]["OPTIONS"]["loaders"] = [  # noqa: F405
    ["django.template.loaders.cached.Loader", [
        "django.template.loaders.filesystem.Loader",
        "django.template.loaders.app_directories.Loader",
    ], ],
]

# Your local stuff: Below this line define 3rd party library settings
# ----------------------------------------------------------------------------
INSTALLED_APPS += ["dev.apps.DevConfig"]  # noqa: F405
