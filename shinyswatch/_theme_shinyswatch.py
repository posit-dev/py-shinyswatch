from __future__ import annotations

import os

from htmltools import HTMLDependency
from shiny.ui import Theme

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_theme_colors, bsw5_version


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


class ShinyswatchTheme(Theme):
    # Leave type definitions for pyright type stubs; Do not set values here
    name: BSW5_THEME_NAME
    colors: ThemeColors

    def __init__(self, name: BSW5_THEME_NAME) -> None:
        assert_theme(name=name)
        super().__init__(preset=name, name=name)
        self.colors = ThemeColors(name)

    def __call__(self) -> ShinyswatchTheme:
        # We keep the callable interface for backwards compatibility, but simply return
        # `self` rather than the HTMLDependency object. This ensures that the error
        # raised by tagifing a Theme object still occurs even with the called interface.
        return self

    def _can_use_precompiled(self):
        return self._version == bsw5_version and not super()._has_customizations()

    def _dep_name(self) -> str:
        return f"shinyswatch-css-{self.name}"

    def _dep_css_name(self) -> str:
        return "bootswatch.min.css"

    def _dep_css_precompiled_path(self) -> str:
        return os.path.join(
            os.path.dirname(__file__),
            "bsw5",
            self.name,
            self._dep_css_name(),
        )

    def _html_dependency(self) -> HTMLDependency:
        """
        For backwards-compatibility with previous versions of shinyswatch.
        """

        # Shiny v1.2.0 renamed the `_html_dependency()` method to `_html_dependencies()`
        # to allow Theme sub-classes to append dependencies. shinyswatch doesn't rely on
        # that behavior, but we did advertise usage of the `_html_dependency()` method,
        # so this shim is included to avoid breaking potential existing uses of the
        # method.

        return self._html_dependencies()[0]
