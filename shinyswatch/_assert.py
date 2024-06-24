from __future__ import annotations

import warnings

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


class DEPRECATED_PARAM:
    """
    Deprecated parameter

    This parameter is deprecated. Please review the function documentation for more
    information.
    """

    def __bool__(self) -> bool:
        return False

    def __eq__(self, other: object) -> bool:
        return isinstance(other, DEPRECATED_PARAM)

    def __repr__(self) -> str:
        return "<DEPRECATED>"


def assert_deprecated(value: object, name: str, instructions: str) -> None:
    if not isinstance(value, DEPRECATED_PARAM):
        warnings.warn(
            f"Parameter `{name}` is deprecated. {instructions}",
            RuntimeWarning,
            stacklevel=3,
        )
