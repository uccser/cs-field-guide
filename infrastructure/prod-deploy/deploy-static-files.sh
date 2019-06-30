#!/bin/bash

source ./infrastructure/prod-deploy/load-prod-deploy-config-envs.sh

# Deploy static files to the production static file server.

./csfg start
# Generate production static files
rm -r build/
rm -r staticfiles/
./csfg update
./csfg static_prod
./csfg make_interactive_thumbnails
./csfg collect_static

# Install Google Cloud SDK
./infrastructure/install_google_cloud_sdk.sh

# Decrypt secret files archive that contain credentials.
./infrastructure/prod-deploy/decrypt-prod-secrets.sh

# Authenticate with gcloud tool using the decrypted service account credentials.
# See: https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account
gcloud auth activate-service-account --key-file continuous-deployment-prod.json

# Create empty SSH keys with an empty passphrase, for Google Cloud SDK to
# copy files to a VM for building the Docker image.
# Only required for deploying to Google App Engine flexible environment.
# See: https://cloud.google.com/solutions/continuous-delivery-with-travis-ci#continuous_deployment_on_app_engine_flexible_environment_instances
ssh-keygen -q -N "" -f ~/.ssh/google_compute_engine

# Publish static files.
#
# This copies the generated static files from tests to the Google Storage
# Bucket.
# See: https://cloud.google.com/python/django/flexible-environment#deploy_the_app_to_the_app_engine_flexible_environment
gsutil rsync -R ./csfieldguide/staticfiles/ gs://cs-field-guide.appspot.com/static/
