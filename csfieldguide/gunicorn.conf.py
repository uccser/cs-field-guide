"""Configuration file for gunicorn."""

# Details from https://cloud.google.com/appengine/docs/flexible/python/runtime
worker_class = "gevent"
forwarded_allow_ips = "*"
secure_scheme_headers = {"X-APPENGINE-HTTPS": "on"}
