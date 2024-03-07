from htmltools import HTMLDependency, TagList
from shiny import reactive, render, req, ui
from shiny.session import require_active_session

from ._bsw5 import BSW5_THEME_NAME, bsw5_themes
from ._get_theme_deps import get_theme_deps
from ._shiny import base_dep_version

default_theme_name = "superhero"

theme_name: reactive.Value[BSW5_THEME_NAME] = reactive.Value(default_theme_name)
# Use a counter to force the new theme to be registered as a dependency
counter: reactive.Value[int] = reactive.Value(0)


def theme_picker_ui() -> ui.TagChild:
    """
    Theme picker - UI

    Add this to your UI to enable the theme picker. This function requires :func:`~shinyswatch.theme_picker_server` to be included in your `server` function.

    Notes
    -----
    * All simultaneous theme picker users on the same Shiny server will see the same theme. This only is an issue when you are sharing the same Shiny server.
    * Do not include more than one theme picker in your app.
    * Do not call the theme picker UI / server inside a module.

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
        ui.tags.script(
            """
            (function() {
                const display_warning = setTimeout(function() {
                    window.document.querySelector("#shinyswatch_picker_warning").style.display = 'block';
                }, 1000);
                Shiny.addCustomMessageHandler('shinyswatch-hide-warning', function(message) {
                    window.clearTimeout(display_warning);
                });
                Shiny.addCustomMessageHandler('shinyswatch-refresh', function(message) {
                    window.location.reload();
                });
            })()
            """
        ),
        ui.input_select(
            id="shinyswatch_theme_picker",
            label="Select a theme:",
            # TODO-barret; selected
            selected=None,
            choices=[],
        ),
        get_theme_deps(default_theme_name),
        ui.output_ui("shinyswatch_theme_deps"),
    )


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
    output = session.output

    @reactive.Effect
    @reactive.event(input.shinyswatch_theme_picker)
    async def _():
        counter.set(counter() + 1)
        if theme_name() != input.shinyswatch_theme_picker():
            theme_name.set(input.shinyswatch_theme_picker())
            await session.send_custom_message("shinyswatch-refresh", {})

    @output
    @render.ui
    def shinyswatch_theme_deps():  # pyright: ignore[reportUnusedFunction]
        req(theme_name())

        # Get the theme dependencies and set them to a version that will always be registered
        theme_deps = get_theme_deps(theme_name())
        incremented_version = HTMLDependency(
            name="VersionOnly",
            version=f"{base_dep_version}.{counter()}",
        ).version
        for theme_dep in theme_deps:
            theme_dep.version = incremented_version
        # Return dependencies in a TagList so they can all be utilized
        return TagList(theme_deps)

    @reactive.Effect
    async def _():
        ui.update_selectize(
            "shinyswatch_theme_picker",
            selected=theme_name(),
            choices=bsw5_themes,
        )
        # Disable the warning message
        await session.send_custom_message("shinyswatch-hide-warning", {})
