Test Suite
##############################################################################

.. contents:: Contents
  :local:


Running the Test Suite
==============================================================================

``./dev test_suite`` will run the entire test suite.

``./dev test_specific <module>`` will run a specific module of tests, for example, ``./dev test_specific tests.appendices.views`` will run all the views test for appendices.

All tests are in the ``csfieldguide/tests/`` directory, which mirrors the structure of the ``csfieldguide/`` directory with directories matching the installed Django applications.

Note that each application being tested has it's own folder, and this is then broken down further into the component being tested (i.e. views, urls, models, etc).

Items of interest from this diagram:

- ``models/`` - contains a test file for each model in the app.

- ``urls/`` - contains a test file for each url in the app.

- ``views/`` - contains a test file for each view in the app.

- ``loaders/`` - contains a test file for each loader in the app as well as an
  ``assets/`` directory. Test yaml files should be saved in the corresponding loader directory within ``assets/`` and should mimick the folder structure of the app where necessary.

- Test Data Generators - these are classes used to generate place holder data in the database.
  You should use the methods in these files when testing a model that contains a foreign key and/or many-to-many field that needs to be populated.

- ``BaseTestWithDB.py`` - this class inherits the Django ``TestCase`` class, and creates and logs in a user.
  This is the base test class that all other tests should inherit from in order to interact with the database.

- ``utils/errors/`` - contains test error classes for testing exceptions are raised correctly by the loaders.

Adding Tests
==============================================================================

When writing a new test function, it is important that the method name is as descriptive as possible.
The method name should also be prefixed with ``test_`` as the test suite will only execute methods with this prefix.

.. note::

  We use `Codecov`_ to check the coverage of our tests.
  Ideally each pull request should cover 100% of the changes (therefore increasing the total project coverage).

.. _Codecov: https://codecov.io/
