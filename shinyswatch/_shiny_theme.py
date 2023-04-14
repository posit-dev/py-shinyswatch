# TODO-barret; If the version does not start with a 5, raise a warning fi the major version is not 5
# TODO-barret; Make a test to check if the shiny version of bootstrap is not v5
# TODO-barret; make the themes into methods that return the theme object
# def cerulean():
#     return get_theme("cerulean")
# TODO-barret; Remind users that they will need internet access to get the fonts

from __future__ import annotations

import os
from copy import deepcopy

from htmltools import HTMLDependency
from shiny.ui import page_bootstrap as shiny_page_bootstrap

from ._bsw5 import bsw5_version

_bs5_path = os.path.join(os.path.dirname(__file__), "bs5")


# Overwrite the bootstrap dependency with a custom one that disables the stylesheet
bs_dep_no_files = None

# Get a vanilla bootstrap page to extract the bootstrap dependency
shiny_deps = shiny_page_bootstrap().get_dependencies()
for dep in shiny_deps:
    if dep.name != "bootstrap":
        continue
    # Copy the dependency,
    # and disable the stylesheet (to be overwritten by shinyswatch)
    # and disable the JS to make sure the BS's JS files match (to be overwritten by shinyswatch)
    # There could be `meta` or `head` information in the dependency that we want to keep
    bs_dep_no_files = deepcopy(dep)
    # Disable bootstrap.min.css as it is included in bootswatch bundle
    bs_dep_no_files.stylesheet = []
    # Disable bootstrap.min.js as it is included at end of function
    bs_dep_no_files.script = []
    # Rename to convey intent (and to disable it below)
    bs_dep_no_files.name = "bootstrap-no-files"

if bs_dep_no_files is None:
    raise ValueError("Could not find bootstrap dependency")


# This is to prevent the Shiny bootstrap stylesheet from being loaded and instead load the bootswatch + bootstrap stylesheet
def shiny_theme(html_dep: HTMLDependency) -> list[HTMLDependency]:
    return [
        # Use a custom version of bootstrap with no stylesheets/JS
        bs_dep_no_files,
        # _Disable_ bootstrap html dep
        # Prevents  bootstrap from being loaded at a later time (Ex: shiny.ui.card() https://github.com/rstudio/py-shiny/blob/d08af1a8534677c7026b60559cd5eafc5f6608d7/shiny/ui/_navs.py#L983)
        HTMLDependency(
            name="bootstrap",
            version="9999",
        ),
        # Add in the matching JS files
        HTMLDependency(
            name="bootstrap-js",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": _bs5_path},
            script={"src": "bootstrap.bundle.min.js"},
        ),
        html_dep,
    ]
