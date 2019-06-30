#!/bin/bash

source ./infrastructure/prod-deploy/load-prod-deploy-config-envs.sh

# Deploys the application to Google App Engine

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

# Delete all previous stopped versions of application on Google App Engine.
# This command deletes all stopped applications of the 'default' service,
# and when the new application is deployed, the previous application version
# will remain until the next deployment.
# We delete old versions due avoid hitting the App Engine version limit.
declare -a versions_to_delete
versions_to_delete=($(gcloud app versions list --filter="SERVING_STATUS=STOPPED" --service=default --format="[no-heading]" | awk '{print $2}' | tr '\n' ' '))
for version in "${versions_to_delete[@]}"; do
  gcloud app versions delete --service=default ${version}
done

# Load environment variables which contain secrets for production environment.
source ./load-prod-deploy-envs.sh

# Create app-prod.yaml file using secret environment variables, to be uploaded inside app.
python ./infrastructure/replace_envs.py ./infrastructure/prod-deploy/app-prod.yaml

# Symlinks aren't added into a docker image, so replace symlink with actual directory
rm -rf csfieldguide/locale/yy_RL
cp -r csfieldguide/locale/xx_LR csfieldguide/locale/yy_RL

# Start system to create search index files
./csfg start
./csfg update

# Publish Django system to Google App Engine.
#
# This deploys using the 'app-prod.yaml' decrypted earlier that contains
# secret environment variables to use within the application.
# Project is specified to ensure correct project deployment.
# Runs with '--quiet' to skip prompt of confirmation.
# If multiple services are deployed at a later stage, these should be checked
# that the apps deploy to the correct services.
# See: https://cloud.google.com/sdk/gcloud/reference/app/deploy
gcloud app deploy ./app-prod.yaml --quiet --project=cs-field-guide
