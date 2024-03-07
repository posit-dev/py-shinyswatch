from __future__ import annotations

from ._bsw5 import bsw5_themes, bsw5_version

newline_and_star = "\n* "


def assert_theme(*, name: object) -> None:
    if not isinstance(name, str):
        raise TypeError("`name` must be a string")
    if name not in bsw5_themes:
        theme_names = newline_and_star.join(bsw5_themes)
        raise ValueError(
            f"Bootswatch theme `{name}` not supported. Bootswatch version `{bsw5_version}` has themes:{newline_and_star}{theme_names}"
        )
