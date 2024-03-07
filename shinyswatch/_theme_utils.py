from __future__ import annotations

from htmltools import HTMLDependency, Tagifiable, TagList

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_theme_colors
from ._get_theme_deps import get_theme_deps as _get_theme_deps


class ThemeColors:
    # Leave type definitions for pyright type stubs; Do not set values here
    # Leave type definintions here for completions w/ static type checker
    primary: str
    secondary: str
    success: str
    danger: str
    warning: str
    info: str
    light: str
    dark: str
    body_color: str
    body_bg: str

    def __init__(self, name: BSW5_THEME_NAME) -> None:
        colors = bsw5_theme_colors[name]
        _color_names: list[str] = list(colors.keys())
        _color_name_len = max(len(x) for x in _color_names)

        self._name = name
        self._color_names = _color_names
        self._color_name_len = _color_name_len
        for k, v in colors.items():
            setattr(self, k, v)

    def __repr__(self) -> str:
        colors = [
            f"{k:{self._color_name_len + 1}}: {getattr(self, k)}"
            for k in self._color_names
        ]
        colors = "\n ".join(colors)
        ret = [f"<ThemeColors({self._name!r}):", " " + colors, ">"]
        return "\n".join(ret)


class ShinyswatchTheme(Tagifiable):
    # Leave type definitions for pyright type stubs; Do not set values here
    name: BSW5_THEME_NAME
    colors: ThemeColors

    def __init__(self, name: BSW5_THEME_NAME) -> None:
        assert_theme(name=name)
        self.name: BSW5_THEME_NAME = name
        self.colors = ThemeColors(name)

    def __call__(self) -> list[HTMLDependency]:
        return _get_theme_deps(self.name)

    def tagify(self) -> TagList:
        return TagList(*self())
