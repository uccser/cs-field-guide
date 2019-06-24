Test Suite
##############################################################################

.. contents:: Contents
  :local:


Running the Test Suite
==============================================================================

``./csfg test_suite`` will run the entire test suite.
For running specific tests, viewing code coverage, and more testing commands, see :doc:`../getting_started/helper_commands`.


Structure
==============================================================================

All tests are in the ``tests/`` directory, which in the ``csfieldguide/`` directory (at the same level as the apps).
It is structured as follows:

.. code-block:: none

  └── tests/
      ├── appendices/
      │   ├── urls/
      │   └── views/
      ├── chapters/
      │   ├── loaders/
      │   ├── management/
      │   ├── models/
      │   ├── urls/
      │   ├── views/
      │   └── ChaptersTestDataGenerator.py
      ├── general/
      │   ├── management/
      │   ├── urls/
      │   └── views/
      ├── interactives/
      │   ├── loaders/
      │   │   └── assets/
      │   ├── management/
      │   ├── models/
      │   ├── urls/
      │   ├── utils/
      │   ├── views/
      │   └── InteractivesTestDataGenerator.py
      ├── utils
      │   └── errors/
      └── BaseTestWithDB.py

Note that each app being tested has it's own folder, and this is then broken down further into the component being tested (i.e. views, urls, models, etc).

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
  Every Pull Request should cover 100% of the difference (therefore increasing coverage), Travis will fail if this is not the case.


.. _Codecov: https://codecov.io/
