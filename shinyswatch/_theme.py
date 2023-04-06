from __future__ import annotations

import os
from copy import deepcopy

from htmltools import HTMLDependency
from shiny.ui import page_bootstrap as shiny_page_bootstrap

from ._assert import assert_theme
from ._themes import versions


def _shiny_theme(html_dep: HTMLDependency) -> list[HTMLDependency]:
    bs_no_style = None

    # Get a vanilla bootstrap page to extract the bootstrap dependency
    shiny_deps = shiny_page_bootstrap().get_dependencies()
    for dep in shiny_deps:
        if dep.name == "bootstrap":
            # Copy the dependency, but only disable the stylesheet (to keep the JS files)
            bs_no_style = deepcopy(dep)
            # Disable bootstrap.min.css as it is included in bootswatch bundle
            bs_no_style.stylesheet = []
            # Rename to convey intent (and to disable it below)
            bs_no_style.name = "bootstrap-no-style"

    if bs_no_style is None:
        raise ValueError("Could not find bootstrap dependency")

    return [
        # Use a custom version of bootstrap with no stylesheets
        bs_no_style,
        # _Disable_ bootstrap html dep
        # Prevents  bootstrap from being loaded at a later time (Ex: shiny.ui.card() https://github.com/rstudio/py-shiny/blob/d08af1a8534677c7026b60559cd5eafc5f6608d7/shiny/ui/_navs.py#L983)
        HTMLDependency(
            name="bootstrap",
            version="9999",
        ),
        html_dep,
    ]


def theme(name: str) -> list[HTMLDependency]:
    bs_ver = "5"
    assert_theme(name=name, bs_ver=bs_ver)

    subdir = os.path.join(os.path.dirname(__file__), "bsw" + bs_ver, name)

    # Contains both bootstrap and bootswatch css
    html_dep = HTMLDependency(
        name=f"bootstrap-and-bootswatch-{name}",
        version=versions[bs_ver],
        source={
            "package": "shinyswatch",
            "subdir": subdir,
        },
        stylesheet=[
            {
                "href": "bootswatch.min.css",
            }
        ],
    )

    return _shiny_theme(html_dep=html_dep)
