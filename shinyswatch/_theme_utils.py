from __future__ import annotations

import json
import os

from htmltools import HTMLDependency

from ._bsw5 import BSW5_THEME_NAME
from ._get_theme import get_theme as _get_theme


class ThemeColors:
    def __init__(self, name: BSW5_THEME_NAME) -> None:
        theme_dir = os.path.join(os.path.dirname(__file__), "bsw5", name)
        self._name = name
        self._colors: dict[str, str] = json.load(
            open(os.path.join(theme_dir, "colors.json"))
        )

    def __getattr__(self, key: str) -> str:
        return self._colors[key]

    def __getitem__(self, key: str) -> str:
        return self._colors[key]

    def __dir__(self) -> list[str]:
        return list(self._colors.keys())

    def __repr__(self) -> str:
        colors = [f"{k:11}: {v}" for k, v in self._colors.items()]
        colors = "\n ".join(colors)
        ret = [f"<ThemeColors({self._name!r}):", " " + colors, ">"]
        return "\n".join(ret)


class ShinyswatchTheme:
    def __init__(self, name: BSW5_THEME_NAME) -> None:
        self.name: BSW5_THEME_NAME = name
        self.colors = ThemeColors(name)

    def __call__(self) -> list[HTMLDependency]:
        return self.tagify()

    def tagify(self) -> list[HTMLDependency]:
        return _get_theme(self.name)