Understanding Configuration Files
##############################################################################

There is a lot of content within the CS Field Guide project.
We split this content across many files and configuration files are the things that bring everything together.
These files are used for configuring the content data when stored in the system database, so it's important to understand how to read and write these configuration files for working on this project.

Here is an example configuration file used to define the order of sections in a chapter in the CS Field Guide project:

.. code-block:: yaml

  searching:
    section-number: 1

  sorting:
    section-number: 2

  what-makes-an-algorithm:
    section-number: 3

  the-whole-story:
    section-number: 4

  further-reading:
    section-number: 5

This page aims to give a brief tutorial on YAML files, so you can modify configuration files within this project.

YAML files are mostly made up of key/value pairs, often called a dictionary within programming languages.
The first key/value pair in this configuration file is explained below:

- The key ``searching`` stores a dictionary of information about that chapter section.
  In this case, only information about the section number is stored.
- Inside this dictionary, the key ``section-number`` stores an integer indicating the number order for this section.
  For example **searching** will be the first section, **sorting** the second and so on.

The majority of configuration files within this project only use dictionaries and lists to store their data.
Here are some other useful tips:

.. code-block:: yaml

  # You can include comments in YAML by starting with a # character

  # This stores the integer 7 in the key 'number'
  number: 7

  # This is an ordered list of dictionaries within the key 'difficulties'
  difficulties:
    - level: 1
      name: Beginner
    - level: 2
      name: Growing Experience
    - level: 3
      name: Ready to Expand

You may find that there is more than one configuration file that you need to modify/create.
This is because it is difficult to read files using deep nesting (indentation), so we have split configuration data across multiple files to avoid this issue.

If you want to learn more about YAML, there are plenty of great tutorials available on the internet.
