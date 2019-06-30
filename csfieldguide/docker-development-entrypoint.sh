#!/bin/bash

function postgres_ready(){
/docker_venv/bin/python << END
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="postgres", user="postgres", host="postgres", port="5434")
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - continuing..."

echo "Compiling message files"
/docker_venv/bin/python3 ./manage.py compilemessages

# Start gunicorn service
echo "Starting gunicorn"
/docker_venv/bin/gunicorn -c ./gunicorn.conf.py -b :$PORT config.wsgi --reload
