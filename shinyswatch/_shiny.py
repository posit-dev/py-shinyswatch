# TODO-barret; Make a test to check if the shiny version of bootstrap is not v5
# TODO-barret; Remind users that they will need internet access to get the fonts

from __future__ import annotations

import os
from copy import deepcopy

from shiny.ui import page_bootstrap as shiny_page_bootstrap

bs5_path = os.path.join(os.path.dirname(__file__), "bs5")

base_dep_version = "9999"

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
