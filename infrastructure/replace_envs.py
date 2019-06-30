# For the given file, finds each environment variable placeholder and replaces
# it with the value of the variable. Then writes the file to the directory this
# program was called from.

import os
import re
import sys

REGEX = re.compile("\$\{([a-zA-Z_][a-zA-Z0-9_]*)\}")


def get_filename():
    if len(sys.argv) != 2:
        raise LookupError("One filename argument must be provided!")
    else:
        return sys.argv[1]


def read_file(filename):
    with open(filename, "r", encoding="UTF-8") as file_object:
        file_content = file_object.read()
    return file_content


def replace_placeholders(file_content):
    updated_content = re.sub(REGEX, get_variable_value, file_content)
    return updated_content


def get_variable_value(match):
    variable_name = match.group(1)
    if variable_name in os.environ:
        return os.environ[variable_name]
    else:
        raise LookupError("{} environment variable not found!".format(variable_name))


def write_file(filename, updated_content):
    filename = os.path.basename(filename)
    with open(filename, "w", encoding="UTF-8") as file_object:
        file_object.write(updated_content)


def main():
    filename = get_filename()
    file_content = read_file(filename)
    updated_content = replace_placeholders(file_content)
    write_file(filename, updated_content)


main()
