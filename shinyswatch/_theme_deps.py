from __future__ import annotations

from htmltools import HTMLDependency

from ._assert import DEPRECATED_PARAM, assert_deprecated
from ._bsw5 import bsw5_version

DEPRECATED = DEPRECATED_PARAM()


def deps_shinyswatch_all(
    initial: DEPRECATED_PARAM = DEPRECATED,
) -> list[HTMLDependency]:
    assert_deprecated(
        initial,
        "initial",
        "Please use the `theme` argument of a Shiny page function to set the initial theme.",
    )

    return [
        HTMLDependency(
            name="shinyswatch-css-all",
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": "bsw5"},
            all_files=True,
        ),
    ]
