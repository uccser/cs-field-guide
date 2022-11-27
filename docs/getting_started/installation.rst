Installation Guide
#################################################

This page will set your machine up for working on the CS Field Guide project.
You should only need to do these installation steps once (unless the required
steps for setup change).

Requirements
=================================================

- At least 5 GB of hard drive space.
- An internet connection to download 1 to 2 GB of data.

Recommended Reading
=================================================

If you aren't familiar with the following systems, we recommend
reading tutorials first on how to use them:

- Entering terminal commands for your operating system
- Git (here are two Git tutorials: `one`_ `two`_)

Step 1: Install Git
=================================================

Install the version control software `Git`_ onto your computer.

.. note::

    If you are new to Git and not comfortable with using the terminal,
    you may like to use a free program like `SourceTree`_ to use Git.

Step 3: Create GitHub Account
=================================================

If you don't already have an account on GitHub, create a free account on
the `GitHub website`_.
This account will be tied to any changes you submit to the project.

Step 4: Set Git Account Values
=================================================

When you make a commit in Git (the term for changes to the project), the
commit is tied to a name and email address. We need to set name and email
address within the Git system installed on the machine.

- `Setting your username in Git`_
- `Setting your email in Git`_

You can also `keep your email address private on GitHub`_ if needed.

.. note::

    If your GitHub account is secured with two-factor authentication (2FA)
    this is a perfect time to setup `SSH keys`_.

Step 5: Download the CS Field Guide Repository
=================================================

Firstly create the directory you wish to hold the CS Field Guide repository
directory in if you wish to store the data in a specific location.
Once you have decided upon the location, clone (the Git term for download) the
project onto your computer.

If you are using terminal commands to use Git, type the following command in
terminal (you don't need to enter the ``$`` character, this shows the start of
your terminal prompt):

.. code-block:: bash

    $ git clone https://github.com/uccser/cs-field-guide.git

.. note::

    If you connect to GitHub through SSH, then type:

    .. code-block:: bash

        $ git clone git@github.com:uccser/cs-field-guide.git

    This may be necessary if you use two-factor authentication to login to GitHub.
    See the note in Step 4 for help with setting up SSH keys with this.

Once Git has cloned the directory, checkout the repository to the development
branch ``develop``.

Step 6: Install Docker
=================================================

We use a system called `Docker`_ to run the CS Field Guide system, both on local
machine for development, and also when deployed to production.

Linux
-----

While it is possible to `install Docker Desktop`_ on Linux,
we recommend installing `Docker Engine`_ and `Docker Compose`_ individually.

With these installed, for our dev script to work, you need to be able to manage docker
as a non root user. See `these instructions`_ on how to do this.

Once you have installed the software, run the following commands in a terminal
to check Docker is working as intended (you don't need to enter the ``$``
character, this shows the start of your terminal prompt).

.. code-block:: bash

    $ docker version
    $ docker compose version
    $ docker run hello-world

Windows
-------

If you are using Windows, we highly recommend using Docker Desktop in
combination with the Windows Subsystem for Linux. See `here`_ for 
installation instructions.

Mac
---

If you are using macOS, Docker Desktop would likely be your best bet, however
we haven't tested the installation on macOS yet.

Step 7: Install Text Editor/IDE (optional)
=================================================

This is a good time to install your preferred IDE or text editor, if you don't
have one already.
Some free options we love:

- `Visual Studio Code`_
- `Sublime Text`_

.. _installation-check-project-setup-works:

Step 8: Check Project Setup Works
=================================================

To check the project works, open a terminal in the project root directory,
which is the ``cs-field_guide/`` directory (should contain a file called
``dev``).

Type the following commands into the terminal (we will cover these commands
in more detail on the next page):

.. code-block:: bash

    $ ./dev start
    $ ./dev update

If this is the first time you're running this script, it will need to build
system images.
This can take some time, roughly 15 to 30 minutes, depending on your computer
and internet speed (we recommend grabbing a cup of tea and watching an episode
of Brooklyn Nine-Nine on Netflix).

After the helper script builds the system images, it will automatically start
the system, and will let you know when the system is ready.
You should then be able to open your preferred web browser to the URL
``cs-field-guide.localhost`` and see the CS Field Guide homepage.

If you are working on documentation, navigate to ``docs.cs-field-guide.localhost``.
This is a live server, so any changes you make to the documentation should be
visible on the webpage within a couple seconds of saving the file.

Congratulations if you made it this far and everything is working,
you're all set to contribute to the CS Field Guide project.

.. _one: https://git-scm.com/docs/gittutorial
.. _two: https://try.github.io/levels/1/challenges/1
.. _virtualenvwrapper: https://virtualenvwrapper.readthedocs.io/en/latest/
.. _Git: https://git-scm.com/
.. _SourceTree: https://www.sourcetreeapp.com/
.. _GitHub website: https://github.com/
.. _SSH keys: https://help.github.com/articles/connecting-to-github-with-ssh/
.. _Setting your username in Git: https://help.github.com/articles/setting-your-username-in-git/
.. _Setting your email in Git: https://help.github.com/articles/setting-your-email-in-git/
.. _keep your email address private on GitHub: https://help.github.com/articles/keeping-your-email-address-private/
.. _Docker: https://www.docker.com/
.. _Docker Store: https://store.docker.com/search?type=edition&offering=community
.. _Verto documentation: http://verto.readthedocs.io/en/latest/install.html
.. _Visual Studio Code: https://code.visualstudio.com/
.. _Sublime Text: https://www.sublimetext.com/
.. _here: https://docs.docker.com/desktop/windows/wsl/
.. _install Docker Desktop: https://docs.docker.com/desktop/install/linux-install/
.. _Docker Engine: https://docs.docker.com/engine/install/#server
.. _Docker Compose: https://docs.docker.com/compose/install/#scenario-two-install-the-compose-plugin
.. _these instructions: https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user
