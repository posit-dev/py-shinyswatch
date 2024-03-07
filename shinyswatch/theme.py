# Do not edit this file, please run `Rscript scripts/update_bootswatch.R`

"""
Targeted theme methods for all Bootswatch themes.
"""

from __future__ import annotations

import json
import os

from htmltools import HTMLDependency

from ._bsw5 import BSW5_THEME_NAME
from ._get_theme import get_theme as _get_theme

__all__ = (
    "cerulean",
    "cosmo",
    "cyborg",
    "darkly",
    "flatly",
    "journal",
    "litera",
    "lumen",
    "lux",
    "materia",
    "minty",
    "morph",
    "pulse",
    "quartz",
    "sandstone",
    "simplex",
    "sketchy",
    "slate",
    "solar",
    "spacelab",
    "superhero",
    "united",
    "vapor",
    "yeti",
    "zephyr",
)


class ThemeColors:
    def __init__(self, name: BSW5_THEME_NAME) -> None:
        theme_dir = os.path.join(os.path.dirname(__file__), "bsw5", name)
        self._name = name
        self._colors: dict[str, str] = json.load(
            open(os.path.join(theme_dir, "colors.json"))
        )

    def __getattr__(self, key: str) -> str:
        return self._colors[key]

    def __dir__(self) -> list[str]:
        return list(self._colors.keys())

    def __repr__(self) -> str:
        colors = [f"{k:11}: {v}" for k, v in self._colors.items()]
        ret = [f"ThemeColors({self._name!r}):", "\n ".join(colors), ">"]
        return "\n".join(ret)


class ShinyswatchTheme:
    def __init__(self, name: BSW5_THEME_NAME) -> None:
        self.name: BSW5_THEME_NAME = name
        self.colors = ThemeColors(name)

    def __call__(self) -> list[HTMLDependency]:
        return self.tagify()

    def tagify(self) -> list[HTMLDependency]:
        return _get_theme(self.name)


cerulean = ShinyswatchTheme("cerulean")
"""
`cerulean` Bootswatch theme

Visit [https://bootswatch.com/cerulean/](https://bootswatch.com/cerulean/) to see a Bootswatch's demo of the `cerulean` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (cerulean) and Bootstrap 5 theme.
"""


cosmo = ShinyswatchTheme("cosmo")
"""
`cosmo` Bootswatch theme

Visit [https://bootswatch.com/cosmo/](https://bootswatch.com/cosmo/) to see a Bootswatch's demo of the `cosmo` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (cosmo) and Bootstrap 5 theme.
"""

cyborg = ShinyswatchTheme("cyborg")
"""
`cyborg` Bootswatch theme

Visit [https://bootswatch.com/cyborg/](https://bootswatch.com/cyborg/) to see a Bootswatch's demo of the `cyborg` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (cyborg) and Bootstrap 5 theme.
"""

darkly = ShinyswatchTheme("darkly")
"""
`darkly` Bootswatch theme

Visit [https://bootswatch.com/darkly/](https://bootswatch.com/darkly/) to see a Bootswatch's demo of the `darkly` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (darkly) and Bootstrap 5 theme.
"""

flatly = ShinyswatchTheme("flatly")
"""
`flatly` Bootswatch theme

Visit [https://bootswatch.com/flatly/](https://bootswatch.com/flatly/) to see a Bootswatch's demo of the `flatly` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (flatly) and Bootstrap 5 theme.
"""

journal = ShinyswatchTheme("journal")
"""
`journal` Bootswatch theme

Visit [https://bootswatch.com/journal/](https://bootswatch.com/journal/) to see a Bootswatch's demo of the `journal` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (journal) and Bootstrap 5 theme.
"""

litera = ShinyswatchTheme("litera")
"""
`litera` Bootswatch theme

Visit [https://bootswatch.com/litera/](https://bootswatch.com/litera/) to see a Bootswatch's demo of the `litera` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (litera) and Bootstrap 5 theme.
"""

lumen = ShinyswatchTheme("lumen")
"""
`lumen` Bootswatch theme

Visit [https://bootswatch.com/lumen/](https://bootswatch.com/lumen/) to see a Bootswatch's demo of the `lumen` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (lumen) and Bootstrap 5 theme.
"""

lux = ShinyswatchTheme("lux")
"""
`lux` Bootswatch theme

Visit [https://bootswatch.com/lux/](https://bootswatch.com/lux/) to see a Bootswatch's demo of the `lux` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (lux) and Bootstrap 5 theme.
"""

materia = ShinyswatchTheme("materia")
"""
`materia` Bootswatch theme

Visit [https://bootswatch.com/materia/](https://bootswatch.com/materia/) to see a Bootswatch's demo of the `materia` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (materia) and Bootstrap 5 theme.
"""

minty = ShinyswatchTheme("minty")
"""
`minty` Bootswatch theme

Visit [https://bootswatch.com/minty/](https://bootswatch.com/minty/) to see a Bootswatch's demo of the `minty` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (minty) and Bootstrap 5 theme.
"""

morph = ShinyswatchTheme("morph")
"""
`morph` Bootswatch theme

Visit [https://bootswatch.com/morph/](https://bootswatch.com/morph/) to see a Bootswatch's demo of the `morph` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (morph) and Bootstrap 5 theme.
"""

pulse = ShinyswatchTheme("pulse")
"""
`pulse` Bootswatch theme

Visit [https://bootswatch.com/pulse/](https://bootswatch.com/pulse/) to see a Bootswatch's demo of the `pulse` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (pulse) and Bootstrap 5 theme.
"""

quartz = ShinyswatchTheme("quartz")
"""
`quartz` Bootswatch theme

Visit [https://bootswatch.com/quartz/](https://bootswatch.com/quartz/) to see a Bootswatch's demo of the `quartz` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (quartz) and Bootstrap 5 theme.
"""

sandstone = ShinyswatchTheme("sandstone")
"""
`sandstone` Bootswatch theme

Visit [https://bootswatch.com/sandstone/](https://bootswatch.com/sandstone/) to see a Bootswatch's demo of the `sandstone` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (sandstone) and Bootstrap 5 theme.
"""

simplex = ShinyswatchTheme("simplex")
"""
`simplex` Bootswatch theme

Visit [https://bootswatch.com/simplex/](https://bootswatch.com/simplex/) to see a Bootswatch's demo of the `simplex` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (simplex) and Bootstrap 5 theme.
"""

sketchy = ShinyswatchTheme("sketchy")
"""
`sketchy` Bootswatch theme

Visit [https://bootswatch.com/sketchy/](https://bootswatch.com/sketchy/) to see a Bootswatch's demo of the `sketchy` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (sketchy) and Bootstrap 5 theme.
"""

slate = ShinyswatchTheme("slate")
"""
`slate` Bootswatch theme

Visit [https://bootswatch.com/slate/](https://bootswatch.com/slate/) to see a Bootswatch's demo of the `slate` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (slate) and Bootstrap 5 theme.
"""


solar = ShinyswatchTheme("solar")
"""
`solar` Bootswatch theme

Visit [https://bootswatch.com/solar/](https://bootswatch.com/solar/) to see a Bootswatch's demo of the `solar` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (solar) and Bootstrap 5 theme.
"""


spacelab = ShinyswatchTheme("spacelab")
"""
`spacelab` Bootswatch theme

Visit [https://bootswatch.com/spacelab/](https://bootswatch.com/spacelab/) to see a Bootswatch's demo of the `spacelab` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (spacelab) and Bootstrap 5 theme.
"""


superhero = ShinyswatchTheme("superhero")
"""
`superhero` Bootswatch theme

Visit [https://bootswatch.com/superhero/](https://bootswatch.com/superhero/) to see a Bootswatch's demo of the `superhero` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (superhero) and Bootstrap 5 theme.
"""

united = ShinyswatchTheme("united")
"""
`united` Bootswatch theme

Visit [https://bootswatch.com/united/](https://bootswatch.com/united/) to see a Bootswatch's demo of the `united` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (united) and Bootstrap 5 theme.
"""


vapor = ShinyswatchTheme("vapor")
"""
`vapor` Bootswatch theme

Visit [https://bootswatch.com/vapor/](https://bootswatch.com/vapor/) to see a Bootswatch's demo of the `vapor` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (vapor) and Bootstrap 5 theme.
"""


yeti = ShinyswatchTheme("yeti")
"""
`yeti` Bootswatch theme

Visit [https://bootswatch.com/yeti/](https://bootswatch.com/yeti/) to see a Bootswatch's demo of the `yeti` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (yeti) and Bootstrap 5 theme.
"""

zephyr = ShinyswatchTheme("zephyr")
"""
`zephyr` Bootswatch theme

Visit [https://bootswatch.com/zephyr/](https://bootswatch.com/zephyr/) to see a Bootswatch's demo of the `zephyr` theme.

Returns
-------
list[htmltools.HTMLDependency]
    List of HTMLDependency objects that create a Bootswatch (zephyr) and Bootstrap 5 theme.
"""
