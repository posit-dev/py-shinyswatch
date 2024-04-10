from __future__ import annotations

from htmltools import HTMLDependency
from shiny import reactive, ui
from shiny.session import require_active_session

from . import __version__ as shinyswatch_version
from ._bsw5 import BSW5_THEME_NAME, bsw5_themes
from ._get_theme_deps import deps_shinyswatch_all, deps_shinyswatch_css_files


def theme_picker_ui(default: BSW5_THEME_NAME = "superhero") -> ui.TagChild:
    """
    Theme picker - UI

    Add this to your UI to enable the theme picker. This function requires :func:`~shinyswatch.theme_picker_server` to be included in your `server` function.

    Notes
    -----
    * All simultaneous theme picker users on the same Shiny server will see the same theme. This only is an issue when you are sharing the same Shiny server.
    * Do not include more than one theme picker in your app.
    * Do not call the theme picker UI / server inside a module.

    Parameters
    ----------
    default
        The default theme to be selected when the theme picker is first loaded.

    Returns
    -------
    :
        A UI elements creating the theme picker.

    See Also
    --------
    * :func:`shinyswatch.theme_picker_server`
    """
    return ui.tags.div(
        # Have a div that is hidden by default and is shown if the server does not
        # disable it. This is nice as the warning will be displayed if the server method
        # is not run.
        ui.div(
            "!! Please include `shinyswatch.theme_picker_server()` in your server function !!",
            style="color: var(--bs-danger); background-color: var(--bs-light); display: none;",
            id="shinyswatch_picker_warning",
        ),
        ui.input_select(
            id="shinyswatch_theme_picker",
            label="Select a theme:",
            # TODO-barret; selected
            selected=default,
            choices=bsw5_themes,
        ),
        theme_picker_deps(default),
    )


def theme_picker_deps(initial: str = "superhero") -> list[HTMLDependency]:
    return [
        *deps_shinyswatch_all(initial),
        HTMLDependency(
            name="shinyswatch-theme-picker",
            version=shinyswatch_version,
            source={"package": "shinyswatch", "subdir": "picker"},
            stylesheet={"href": "theme_picker.css"},
            script={"src": "theme_picker.js"},
        ),
    ]


def theme_picker_server() -> None:
    """
    Theme picker - Server

    This function adds the necessary hooks for the theme picker UI to properly update. This function requires :func:`~shinyswatch.theme_picker_ui` to be included in your UI definition.

    Note: All simultaneous theme picker users on the same Shiny server will see the same theme. This only is an issue when you are sharing the same Shiny server.

    See Also
    --------
    * :func:`~shinyswatch.theme_picker_ui`
    """

    session = require_active_session(None)
    input = session.input

    @reactive.effect
    @reactive.event(input.shinyswatch_theme_picker)
    async def _():

        await session.send_custom_message(
            "shinyswatch-pick-theme",
            {
                "theme": input.shinyswatch_theme_picker(),
                "sheets": deps_shinyswatch_css_files,
            },
        )

    @reactive.effect
    async def _():
        await session.send_custom_message("shinyswatch-hide-warning", {})
