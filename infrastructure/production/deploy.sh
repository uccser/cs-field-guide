#!/bin/bash

set -e

# Check for environment variables
checkEnvVariableExists() {
    if [ -z ${!1} ]
    then
        echo "ERROR: Define $1 environment variable."
        exit 1
    else
        echo "INFO: $1 environment variable found."
    fi
}
checkEnvVariableExists CS_FIELD_GUIDE_IMAGE_TAG
checkEnvVariableExists CS_FIELD_GUIDE_DOMAIN

# Update Django service
docker stack deploy cs-field-guide -c docker-compose.prod.yml

# Wait until previous command finishes
docker service scale cs-field-guide_task-update-data=1
