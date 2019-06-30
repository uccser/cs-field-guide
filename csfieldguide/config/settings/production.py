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

# URL Configuration
# ------------------------------------------------------------------------------
if env("DEPLOYMENT", default=None) == "prod":  # noqa: F405
    PREPEND_WWW = True
else:
    PREPEND_WWW = False

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

# SECURITY CONFIGURATION
# ------------------------------------------------------------------------------
# See https://docs.djangoproject.com/en/dev/ref/middleware/#module-django.middleware.security
# and https://docs.djangoproject.com/en/dev/howto/deployment/checklist/#run-manage-py-check-deploy

# set this to 60 seconds and then to 518400 when you can prove it works
SECURE_HSTS_SECONDS = 60
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)  # noqa: F405
SECURE_CONTENT_TYPE_NOSNIFF = env.bool("DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True)  # noqa: F405
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)  # noqa: F405
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = "SAMEORIGIN"
