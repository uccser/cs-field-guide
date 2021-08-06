#!/bin/bash

docker service create \
    --name cs-field-guide_update-data \
    --detach \
    --mode replicated-job \
    --label traefik.enable=false \
    --network cs-field-guide_backend \
    --constraint node.role==worker \
    --constraint node.labels.role==apps \
    --env POSTGRES_HOST="postgres" \
    --env=POSTGRES_PORT="5432" \
    --env=DEPLOYMENT_ENVIRONMENT_FILE="/cs-field-guide_deployment_environment" \
    --env=DJANGO_SECRET_KEY_FILE="/run/secrets/cs-field-guide_django_secret_key" \
    --env=POSTGRES_DB_FILE="/run/secrets/cs-field-guide_postgres_db" \
    --env=POSTGRES_USER_FILE="/run/secrets/cs-field-guide_postgres_user" \
    --env=POSTGRES_PASSWORD_FILE="/run/secrets/cs-field-guide_postgres_password" \
    --config cs-field-guide_deployment_environment \
    --secret cs-field-guide_django_secret_key \
    --secret cs-field-guide_postgres_db \
    --secret cs-field-guide_postgres_user \
    --secret cs-field-guide_postgres_password \
    --restart-condition none \
    ghcr.io/uccser/cs-field-guide:develop python ./manage.py updatedata
