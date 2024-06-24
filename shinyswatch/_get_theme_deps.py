from __future__ import annotations

import os

from htmltools import HTMLDependency

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_version

bs5_path = os.path.join(os.path.dirname(__file__), "bs5")


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
        HTMLDependency(
            name=f"shinyswatch-css-{name}",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": subdir},
            stylesheet=[{"href": "bootswatch.min.css"}],
        )
    ]


def deps_shinyswatch_all(initial: str = "superhero") -> list[HTMLDependency]:
    assert_theme(name=initial)

    return [
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
