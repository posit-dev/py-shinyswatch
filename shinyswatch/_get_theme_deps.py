from __future__ import annotations

import os

from htmltools import HTMLDependency

# from shiny.ui._html_deps_external import bootstrap_deps_suppress
from shiny._versions import bootstrap as shiny_bootstrap_version

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_version

bs5_path = os.path.join(os.path.dirname(__file__), "bs5")


def suppress_shiny_bootstrap() -> list[HTMLDependency]:
    return [
        # shiny > 0.8.1 will (likely) split bootstrap into separate js/css deps
        HTMLDependency(
            name="bootstrap-js",
            version=shiny_bootstrap_version + ".9999",
        ),
        HTMLDependency(
            name="bootstrap-css",
            version=shiny_bootstrap_version + ".9999",
        ),
        # shiny <= 0.8.1 loads bootstrap as a single dep
        HTMLDependency(
            name="bootstrap",
            version=shiny_bootstrap_version + ".9999",
        ),
        # Disable ionRangeSlider
        # TODO: Remove this when ionRangeSlider no longer requires Sass for BS5+
        HTMLDependency(
            name="preset-shiny-ionrangeslider",
            version="9999",
        ),
    ]


def dep_shinyswatch_bootstrap_js() -> HTMLDependency:
    return HTMLDependency(
        name="shinyswatch-js",
        version=bsw5_version,
        source={"package": "shinyswatch", "subdir": bs5_path},
        script={"src": "bootstrap.bundle.min.js"},
    )


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
        *suppress_shiny_bootstrap(),
        dep_shinyswatch_bootstrap_js(),
        # Shinyswatch - bootstrap / bootswatch css
        HTMLDependency(
            name="shinyswatch-css",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": subdir},
            stylesheet=[{"href": "bootswatch.min.css"}],
        ),
        # ## End Bootswatch
        #
        # ## Start ionRangeSlider
        HTMLDependency(
            name="shinyswatch-ionrangeslider",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": subdir},
            stylesheet=[{"href": "shinyswatch-ionRangeSlider.css"}],
        ),
        # ## End ionRangeSlider
    ]


# TODO: Update this list if the css files in the dependency above change
deps_shinyswatch_css_files = [
    "bootswatch.min.css",
    "shinyswatch-ionRangeSlider.css",
]


def deps_shinyswatch_all(initial: str = "superhero") -> list[HTMLDependency]:
    assert_theme(name=initial)

    return [
        *suppress_shiny_bootstrap(),
        dep_shinyswatch_bootstrap_js(),
        HTMLDependency(
            name="shinyswatch-all-css",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": "bsw5"},
            stylesheet=[
                shinyswatch_all_initial_css(initial, "bootswatch.min.css"),
                shinyswatch_all_initial_css(initial, "shinyswatch-ionRangeSlider.css"),
            ],  # type: ignore
            all_files=True,
        ),
    ]


def shinyswatch_all_initial_css(theme: str, css_file: str) -> dict[str, str]:
    return {
        "href": os.path.join(theme, css_file),
        "data-shinyswatch-css": css_file,
        "data-shinyswatch-theme": theme,
    }
