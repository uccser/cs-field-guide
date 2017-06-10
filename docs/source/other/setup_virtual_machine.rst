Setting up a Virtual Machine
=================================================

The following steps are just one way to set up an Linux virtual machine
for CS Unplugged development, and are intended for those new to setting up
virtual machines.

1. Download and install `Oracle VirtualBox`_.
2. Download installation of preferred Linux operating system.
   A common choice is `Ubuntu 16.04.2 LTS`_.
3. Open VirtualBox and click ``New``.
4. Enter a name for your virtual machine, for example "CS Unplugged".
   Also select the type and version of your operating system.
   If you downloaded the Ubuntu linked above, the type is "Linux",
   and version is "Ubuntu (64-bit)". Click "Next/Continue".
5. Choose the memory you wish to allocate (2048 MB to 4096 MB is recommended).
   Click "Next/Continue".
6. Select "Create a virtual hard disk now". Click "Create".
7. Keep the default selection of "VDI (VirtualBox Disk Image)".
   Click "Next/Continue".
8. Keep the default selection of "Dynamically allocated".
   Click "Next/Continue".
9. Change the name and location of the hard drive for the virtual
   machine if required (default is usually fine).
10. Select the maximum size that the hard drive can grow to (be aware of
    how much space you have available on your machine).
    We recommend 20 GB, as this is enough space to store the Ubuntu operating
    system and the CS Unplugged project.
    Click "Create".
11. Select your virtual machine by clicking on it, and click "Settings" above.
    Within these settings you can also setup a shared clipboard between the
    host and virtual machines, plus increase the number of processors the
    virtual machine can use. There are plenty of guides available online for
    how to enable them.
12. Click the "Storage" category. Under "Controller: IDE" click "Empty".
    On the right of Optical Drive dropdown menu, click the CD disk icon.
    Select "Choose Virtual Optical Disk File" and select the operating system
    installation file that you downloaded earlier (it's probably in your
    "Downloads" folder).
    Close the Settings window.
13. Select the virtual machine by clicking on it and click the green "Start"
    button above.
    The operating system installation screen should appear upon starting.
14. Install the operating system using the default settings.
15. Once the operating system has completed installation, you are ready to use
    it for developing the CS Unplugged project.
    You're now ready for :ref:`step-2-install-git` in the
    installation guide.

.. _Oracle VirtualBox: https://www.virtualbox.org/
.. _Ubuntu 16.04.2 LTS: https://www.ubuntu.com/download/desktop
