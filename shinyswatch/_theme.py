from __future__ import annotations

import os

from htmltools import HTMLDependency

from ._assert import assert_theme
from ._themes import versions


def theme(name: str, *, bs_ver: str = "5") -> HTMLDependency:
    assert_theme(name=name, bs_ver=bs_ver)

    subdir = os.path.join(os.path.dirname(__file__), "bootswatch", bs_ver, name)

    return HTMLDependency(
        name=f"bootswatch-{name}",
        version=versions[bs_ver],
        source={
            "package": "shinyswatch",
            "subdir": subdir,
        },
        stylesheet=[
            {
                "href": "bootstrap.min.css",
            }
        ],
    )
