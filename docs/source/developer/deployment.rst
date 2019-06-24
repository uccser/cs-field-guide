Deployment
##############################################################################

.. note::

  This page is intended only for staff within the University of Canterbury
  Computer Science Education Research Group, as deployment requires access
  to secret passwords and values stored within our private password management
  system.

Requirements
==============================================================================

The project is designed to run on the following systems:

- Google App Engine: Flexible Enviroment.
- Google Cloud SQL: Postgres Database.

  - Several Django models require Postgres specific data types, so the
    system will not function on a different database type (for example: MySQL).

- Static files server.

Deployment overview
==============================================================================

Deployment requires three steps, and can be done in any order:

1. Updating static files on Google Cloud Storage Bucket.
2. Updating Django application on Google App Engine.
3. Connecting to the Google Cloud SQL database and updating schema and data.

We update in the order above to have minimal downtime between deploying a new application and updating the database (currently around 30 to 60 seconds on development deployment).

Development deployment
==============================================================================

Deployment of the ``develop`` branch occurs automatically with new commits to the ``develop`` branch, and is deployed by Travis CI.

The system is deployed to: https://cs-field-guide-dev.appspot.com/.

The script and files used for deployment is stored in the ``infrastructure/dev-deploy/`` directory.
The ``deploy-app.sh`` script contains descriptions of the process required for deployment.
The file ``dev-deploy-secrets.tar.enc`` is an encrypted archive of files containing sensitive data, and is decrypted by Travis CI.

Production deployment
==============================================================================

Deployment of the ``master`` branch occurs automatically with new commits to the ``master`` branch, and is deployed by Travis CI.

The system is deployed to: https://www.csfieldguide.org.nz/.

Manual deployment
==============================================================================

.. warning::

  The following steps will allow manual deployment.
  This information is not exhaustive, but will provide enough information for manual deployment.
  The deployment scripts have greater details of the deployment process.

For any manual deployment, you will require the `gcloud`_ tool to be installed on your machine, and login with the research group admin Google account.

Manual deployment requires three steps, and can be done in any order:

1. Updating static files on Google Cloud Storage Bucket.
2. Updating Django application on Google App Engine.
3. Connecting to the Google Cloud SQL database and updating schema and data.

**Updating static files**

The simpliest way to upload the static files on the storage bucket, is to do the following:

1.  Delete the following folders if they exist:

    - ``csfieldguide/build/``
    - ``csfieldguide/staticfiles/``
    - ``csfieldguide/temp/``

    This may require administrator (``sudo``) permissions as these folders are created by Docker.

2. Run the ``./csfg start`` command.
   When the system is started, the static files are generated.
   Once the system has started successfully, run the ``./csfg end`` command.

3. From the root directory, run the following command:

   .. code-block:: bash

     $ gsutil rsync -R csfieldguide/staticfiles/ gs://cs-field-guide-develop/static/

**Updating Django application**

In the ``infrastructure`` directory, create a copy of ``app-sample.yaml`` called ``app.yaml`` in the root directory, and enter the required values.
The complete contents for this file is also stored in our password management system.

From the root directory, run the following command:

.. code-block:: bash

  $ gcloud app deploy app.yaml


**Updating database**

To update the development database, we will setup a SQL proxy to the server, and then locally run the Django project that will connect to the server.
We can then perform the ``migrate`` and ``updatedata`` commands as required.

Using the `guide for Django on Google App Engine Flexible Environment`_, download and setup the SQL proxy.
You will need to choose a port that the SQL proxy and Django will operate on, using ``5432`` should work for most developers.
Alter the Django configuration to connect using the proxy port, and run the system.
You should be able to then perform the ``migrate`` and ``updatedata`` commands.

.. _gcloud: https://cloud.google.com/sdk/gcloud/
.. _guide for Django on Google App Engine Flexible Environment: https://cloud.google.com/python/django/flexible-environment
