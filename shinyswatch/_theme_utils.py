from __future__ import annotations

from htmltools import HTMLDependency, Tagifiable, TagList

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_theme_colors
from ._get_theme_deps import get_theme_deps as _get_theme_deps


class ThemeColors:
    def __init__(self, name: BSW5_THEME_NAME) -> None:
        self._name = name
        self._colors: dict[str, str] = bsw5_theme_colors[name]

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


class ShinyswatchTheme(Tagifiable):
    def __init__(self, name: BSW5_THEME_NAME) -> None:
        assert_theme(name=name)
        self.name: BSW5_THEME_NAME = name
        self.colors = ThemeColors(name)

    def __call__(self) -> list[HTMLDependency]:
        return _get_theme_deps(self.name)

    def tagify(self) -> TagList:
        return TagList(_get_theme_deps(self.name))
