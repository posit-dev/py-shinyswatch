from __future__ import annotations

from htmltools import HTMLDependency

from ._assert import assert_theme
from ._themes import versions

# <link href="
# https://cdn.jsdelivr.net/npm/bootswatch@5.2.3/dist/cerulean/bootstrap.min.css
# " rel="stylesheet">


def theme_cdn(name: str, *, bs_ver: str = "5") -> HTMLDependency:
    assert_theme(name=name, bs_ver=bs_ver)
    return HTMLDependency(
        name=f"bootswatch-cdn-{name}",
        version=versions[bs_ver],
        source={
            "href": f"https://cdn.jsdelivr.net/npm/bootswatch@{versions[bs_ver]}/dist/{name}",
        },
        stylesheet=[
            {
                "href": "bootstrap.min.css",
            }
        ],
    )
