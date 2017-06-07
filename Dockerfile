# This Dockerfile is based off the Google App Engine Python runtime image
# https://github.com/GoogleCloudPlatform/python-runtime
FROM gcr.io/google-appengine/python

# Add metadata to Docker image
LABEL maintainer="csse-education-research@canterbury.ac.nz"

# Set terminal to be noninteractive
ARG DEBIAN_FRONTEND=noninteractive

ENV DJANGO_PRODUCTION=False

# Install packages, running of Python 3.4.2
RUN apt-get update && apt-get install -y \
      python3 \
      python3-dev \
      python3-pip
RUN apt-get clean && rm /var/lib/apt/lists/*_*

EXPOSE 8080

# Copy and install Python dependencies
RUN python -m virtualenv --python=python3.4 /docker_venv
COPY requirements /requirements
RUN /docker_venv/bin/pip3 install -r /requirements/local.txt

RUN mkdir /cs-field-guide/
RUN mkdir /cs-field-guide/csfieldguide/
WORKDIR /cs-field-guide/csfieldguide/