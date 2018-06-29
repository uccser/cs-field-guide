# -*- coding: utf-8 -*-
"""
Django settings for production environment.

- Load secret values from environment variables.
- Set static URL to Google Cloud Storage Bucket.
"""

from .base import *  # noqa: F403


# SECRET CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Raises ImproperlyConfigured exception if DJANGO_SECRET_KEY not in os.environ
SECRET_KEY = env("DJANGO_SECRET_KEY")  # noqa: F405

# SECURITY WARNING: App Engine"s security features ensure that it is safe to
# have ALLOWED_HOSTS = ["*"] when the app is deployed. If you deploy a Django
# app not on App Engine, make sure to set an appropriate host here.
# See https://docs.djangoproject.com/en/1.10/ref/settings/
ALLOWED_HOSTS = ["*"]

# DATABASE CONFIGURATION
# ----------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "csfieldguide",
        "USER": env("GOOGLE_CLOUD_SQL_DATABASE_USERNAME"),  # noqa: F405
        "PASSWORD": env("GOOGLE_CLOUD_SQL_DATABASE_PASSWORD"),  # noqa: F405
        "HOST": "/cloudsql/" + env("GOOGLE_CLOUD_SQL_CONNECTION_NAME"),  # noqa: F405
    }
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

# Static files
STATIC_URL = "https://storage.googleapis.com/" + env("GOOGLE_CLOUD_STORAGE_BUCKET_NAME") + "/static/"  # noqa: F405
