Frequently Asked Questions
##############################################################################

The chapters application is the main focus of the CS Field Guide website, as it contains the majority of educational material for the project.

.. contents:: Contents
  :local:

.. _what-is-a-key:

What is a Key?
==============================================================================

We use the term "key" to specify a field name.
Keys map to particular values (which range from learning outcome text, to the structure and attributes of a lesson).

A key is a short label for something, containing only letters, numbers, or hyphens.
In our system, a key must be no longer than 50 characters, and use hyphens instead of underscores.

These are *valid* examples of keys:

- ``algorithms``
- ``binary-numbers``
- ``challenge-2``

These are *invalid* examples of keys:

- ``Algorithms``
- ``Binary Numbers``
- ``Binary_Numbers``
- ``binary_numbers``
- ``challenge 2``

Keys must be exact matches to work, for example, if you name a lesson ``bits-and-bytes``, referencing it in another configuration file as ``bytes-and-bits`` will raise an error.

See also:

- `Definition of URL slug on Wikipedia`_

.. _what-is-an-application:

What is an Application?
==============================================================================

Django contains 'applications' which are Python packages that provide some set of features.
Each large part/chunk of the CS Field Guide is a separate application.
Read :ref:`this section in our project structure guide <django-applications>` for details of the applications used in the CS Field Guide system.

.. _what-is-a-virtual-environment:

What is a Virtual Environment?
==============================================================================

A Virtual Environment is a tool to keep the dependencies required by different projects in separate places, by creating virtual Python environments for them.
It solves the “Project X depends on version 1.x but Project Y needs 4.x” dilemma, and keeps your global site-packages directory clean and manageable.


How do I uninstall the CS Field Guide project?
==============================================================================
Steps for uninstallation can be found in the :ref:`uninstallation` section of the installation guide.

See also:

- `Guide on Virtual Environments`_

.. _Definition of URL slug on Wikipedia: https://en.wikipedia.org/wiki/Semantic_URL#Slug
.. _Guide on Virtual Environments: http://docs.python-guide.org/en/latest/dev/virtualenvs/
