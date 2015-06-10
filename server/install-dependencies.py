import sys
from pkg_resources import load_entry_point


modules = ("django",
           "djangorestframework",
           "drf-nested-routers",
           "markdown",
           "django-filter",
           "Pillow",
           "django-admin-bootstrapped")


def install(module):
    sys.argv = [sys.argv[0], "install", module]
    return load_entry_point('pip>=6.0.6', 'console_scripts', 'pip')()


def upgrade(module):
    sys.argv = [sys.argv[0], "install", "--upgrade", module]
    return load_entry_point('pip>=6.0.6', 'console_scripts', 'pip')()


if __name__ == "__main__":
    for module in modules:
        install(module)
        print
