"""Configuration file for gunicorn."""

# Reference: https://pythonspeed.com/articles/gunicorn-in-docker/

# Workers
workers = 2
threads = 4
worker_tmp_dir = "/dev/shm"

# Network
forwarded_allow_ips = "*"
secure_scheme_headers = {"X-APPENGINE-HTTPS": "on"}

# Logging
errorlog = "-"
accesslog = "-"
