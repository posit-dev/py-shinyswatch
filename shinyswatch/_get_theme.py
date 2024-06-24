from __future__ import annotations

from ._bsw5 import BSW5_THEME_NAME
from ._theme_shinyswatch import ShinyswatchTheme


def get_theme(name: BSW5_THEME_NAME) -> ShinyswatchTheme:
    """
    Get a Bootstrap 5 Bootswatch theme for Shiny.

    Parameters
    ----------
    name
        A Bootswatch theme name.

    Returns
    -------
    :
        A Bootswatch and Bootstrap 5 theme for Shiny.
    """
    return ShinyswatchTheme(name)
