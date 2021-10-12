"""Configuration file for gunicorn."""

import logging
from gunicorn import glogging

# Reference: https://pythonspeed.com/articles/gunicorn-in-docker/

# Workers
workers = 2
threads = 4
worker_tmp_dir = "/dev/shm"

# Network
forwarded_allow_ips = "*"
secure_scheme_headers = {"X-APPENGINE-HTTPS": "on"}

# Logging


class CustomGunicornLogger(glogging.Logger):
    """Custom logger for Gunicorn."""

    def setup(self, cfg):
        """Create logger and add custom filter."""
        super().setup(cfg)
        logger = logging.getLogger("gunicorn.access")
        logger.addFilter(HealthCheckFilter())


class HealthCheckFilter(logging.Filter):
    """Custom filter for Gunicorn logger."""

    def filter(self, record):
        """Skip logging requests containing /healthcheck."""
        return record.getMessage().find('/healthcheck') == -1


errorlog = "-"
accesslog = "-"
logger_class = CustomGunicornLogger
