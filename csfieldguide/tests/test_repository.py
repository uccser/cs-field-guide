"""Test class for other respository tests."""

import os.path
import yaml
import glob
from django.test import SimpleTestCase


class RepositoryTests(SimpleTestCase):
    """Test class for tests for other areas of the project repository."""

    def test_node_modules_setup(self):
        """Check if all 'package.json' files are setup in Docker correctly.

        Each 'package.json' needs to:
            - Install dependencies in the Node Dockerfile.
            - Exclude installed dependencies in local Docker Compose setup.
        """
        BASE_DIRECTORY = "/test_files/"
        DOCKER_COMPOSE_FILE = "docker-compose.local.yml"
        DOCKER_COMPOSE_ENTRY = "/app/{}/node_modules/"
        DOCKERFILE_FILE = "Dockerfile"
        DOCKERFILE_ENTRY = "WORKDIR /app/{}/\nRUN npm install"

        with open(os.path.join(BASE_DIRECTORY, DOCKERFILE_FILE)) as f:
            dockerfile_contents = f.read()

        with open(os.path.join(BASE_DIRECTORY, DOCKER_COMPOSE_FILE)) as f:
            docker_compose_config = yaml.safe_load(f.read())
        node_volumes = docker_compose_config['services']['node']['volumes']

        for filepath in glob.iglob("static/**/package.json", recursive=True):
            directory = os.path.dirname(filepath)

            # Check in Dockerfile
            self.assertIn(
                DOCKERFILE_ENTRY.format(directory),
                dockerfile_contents,
                msg="'{}' could not be found referenced in Dockerfile".format(
                    filepath,
                )
            )

            # Check in docker-compose.local.yaml
            self.assertIn(
                DOCKER_COMPOSE_ENTRY.format(directory),
                node_volumes,
                msg="'{}' could not be found referenced in Dockerfile".format(
                    filepath,
                )
            )
