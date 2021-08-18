# -*- coding: utf-8 -*-
"""
Django settings for production environment.

- Load secret values from files.
"""

from .base import *  # noqa: F403


# TODO: Review
# See https://docs.djangoproject.com/en/1.10/ref/settings/
ALLOWED_HOSTS = ["*"]

with open(env("DEPLOYMENT_ENVIRONMENT_FILE")) as file:  # noqa: F405
    DEPLOYMENT_ENVIRONMENT = file.read().strip()
PRODUCTION_ENVIRONMENT = DEPLOYMENT_ENVIRONMENT == "production"
STAGING_ENVIRONMENT = DEPLOYMENT_ENVIRONMENT == "staging"

# SECRET CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Raises ImproperlyConfigured exception if DJANGO_SECRET_KEY not in os.environ
with open(env("DJANGO_SECRET_KEY_FILE")) as file:  # noqa: F405
    SECRET_KEY = file.read().strip()

# URL Configuration
# ------------------------------------------------------------------------------
# TODO: Setup for different environments
if PRODUCTION_ENVIRONMENT:  # noqa: F405
    PREPEND_WWW = True
else:
    PREPEND_WWW = False

# DATABASE CONFIGURATION
# ----------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases

# Read in secret values
with open(env("POSTGRES_DB_FILE")) as file:  # noqa: F405
    POSTGRES_DB = file.read().strip()
with open(env("POSTGRES_USER_FILE")) as file:  # noqa: F405
    POSTGRES_USER = file.read().strip()
with open(env("POSTGRES_PASSWORD_FILE")) as file:  # noqa: F405
    POSTGRES_PASSWORD = file.read().strip()

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": POSTGRES_DB,
        "USER": POSTGRES_USER,
        "PASSWORD": POSTGRES_PASSWORD,
        "HOST": env("POSTGRES_HOST"),  # noqa: F405
        "PORT": env("POSTGRES_PORT"),  # noqa: F405
        "ATOMIC_REQUESTS": True,
    }
}

# SECURITY CONFIGURATION
# ------------------------------------------------------------------------------
# See https://docs.djangoproject.com/en/dev/ref/middleware/#module-django.middleware.security
# and https://docs.djangoproject.com/en/dev/howto/deployment/checklist/#run-manage-py-check-deploy

# set this to 60 seconds and then to 518400 when you can prove it works
# SECURE_HSTS_SECONDS = 60
# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
# SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)  # noqa: F405
# SECURE_CONTENT_TYPE_NOSNIFF = env.bool("DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True)  # noqa: F405
# SECURE_BROWSER_XSS_FILTER = True
# SESSION_COOKIE_SECURE = True
# SESSION_COOKIE_HTTPONLY = True
# SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)  # noqa: F405
# CSRF_COOKIE_SECURE = True
# CSRF_COOKIE_HTTPONLY = True
# X_FRAME_OPTIONS = "SAMEORIGIN"
