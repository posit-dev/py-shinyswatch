from __future__ import annotations

import os

from htmltools import HTMLDependency

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_version
from ._shiny import base_dep_version, bs5_path, bs_dep_no_files


def get_theme_deps(name: BSW5_THEME_NAME) -> list[HTMLDependency]:
    """
    Get the HTML dependencies for a Bootstrap 5 Bootswatch theme for Shiny.

    Parameters
    ----------
    name
        A Bootswatch theme name.

    Returns
    -------
    :
        A list of HTML dependencies.
    """

    assert_theme(name=name)

    subdir = os.path.join(os.path.dirname(__file__), "bsw5", name)

    return [
        # ## Start Bootswatch
        # This is to prevent the Shiny bootstrap stylesheet from being loaded and instead load the bootswatch + bootstrap stylesheet
        # _Disable_ bootstrap html dep
        # Prevents  bootstrap from being loaded at a later time (Ex: shiny.ui.card() https://github.com/rstudio/py-shiny/blob/d08af1a8534677c7026b60559cd5eafc5f6608d7/shiny/ui/_navs.py#L983)
        HTMLDependency(
            name="bootstrap",
            version=base_dep_version,
        ),
        # Use a custom version of bootstrap with no stylesheets/JS
        bs_dep_no_files,
        # Add in the matching JS files
        HTMLDependency(
            name="bootstrap-js",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": bs5_path},
            script={"src": "bootstrap.bundle.min.js"},
        ),
        # Shinyswatch - bootstrap / bootswatch css
        HTMLDependency(
            name=f"bootswatch-{name}-and-bootstrap",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": subdir},
            stylesheet=[{"href": "bootswatch.min.css"}],
        ),
        # ## End Bootswatch
        #
        # ## Start ionRangeSlider
        # Disable ionRangeSlider
        HTMLDependency(
            name="preset-shiny-ionrangeslider",
            version=base_dep_version,
        ),
        # Shinyswatch - ionRangeSlider css
        HTMLDependency(
            name=f"bootswatch-{name}-ionrangeslider",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": subdir},
            stylesheet=[{"href": "shinyswatch-ionRangeSlider.css"}],
        ),
        # ## End ionRangeSlider
    ]
