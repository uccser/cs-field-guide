#!/bin/bash

# Install Google Cloud SDK

# Set the environment variable for Google Cloud SDK to disable prompts
# and choose default settings.
export CLOUDSDK_CORE_DISABLE_PROMPTS=1;

# Create an environment variable for the correct distribution.
export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"

# Add the Cloud SDK distribution URI as a package source.
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import the Google Cloud Platform public key.
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# Update the package list and install the Cloud SDK.
# sudo apt-get update && sudo apt-get install google-cloud-sdk
# TEMPORARY CHANGE: Install Cloud SDK at version 250.0.0-0 to fix gsutil issue until fixed.
# See: https://github.com/uccser/cs-field-guide/issues/1046
gcloud components update --version=250.0.0

# Display the gcloud version, useful for debugging purposes.
# See: https://cloud.google.com/sdk/gcloud/reference/version
gcloud version
