from __future__ import annotations

from htmltools import HTMLDependency
from shiny import reactive, ui
from shiny.session import require_active_session

from ._assert import DEPRECATED_PARAM, assert_deprecated
from ._bsw5 import bsw5_themes, bsw5_version
from ._get_theme import get_theme

DEPRECATED = DEPRECATED_PARAM()


def theme_picker_ui(default: DEPRECATED_PARAM = DEPRECATED) -> ui.TagChild:
    """
    Theme picker - UI

    Add this to your UI to enable the theme picker. Adds a
    :func:`~shiny.ui.input_select` for users to choose a shinyswatch theme. This
    function requires :func:`~shinyswatch.theme_picker_server` to be included in your
    `server` function.

    Notes
    -----
    * Set the initial theme by providing an initial shinyswatch theme to the `theme`
      argument of a Shiny page function, e.g. :func:`~shiny.ui.page_sidebar`.
    * Do not include more than one theme picker in your app.
    * Do not call the theme picker UI / server inside a module.

    Examples
    --------

    ```{.python}
    app_ui = ui.page_sidebar(
        ui.sidebar(
            shinyswatch.theme_picker_ui(),
            # Other input controls in the sidebar...
        ),
        # Your main app content...
        title="Shiny Sidebar Page",
        theme=shinyswatch.theme.minty, # Initial (optional) app theme
    )
    ```

    Parameters
    ----------
    default
        Deprecated. Please use the `theme` argument of a Shiny page function to set the
        initial theme.

    Returns
    -------
    :
        A UI element creating the theme picker.

    See Also
    --------
    * :func:`shinyswatch.theme_picker_server`
    """
    assert_deprecated(
        default,
        "default",
        "Please use the `theme` argument of a Shiny page function to set the initial theme.",
    )

    return ui.TagList(
        # Have a div that is hidden by default and is shown if the server does not
        # disable it. This is nice as the warning will be displayed if the server method
        # is not run.
        ui.Tag(
            "shinyswatch-theme-picker",
            ui.div(
                ui.div(
                    ui.HTML("&#9888;<br>"),  # warning triangle
                    "Please include ",
                    ui.code(
                        "shinyswatch.theme_picker_server()",
                        style="overflow-wrap: anywhere;",
                    ),
                    " in your server function.",
                ),
                style="display: none;",
                class_="alert alert-danger align-items-center",
                role="alert",
                id="shinyswatch_picker_warning",
            ),
            ui.input_select(
                id="shinyswatch_theme_picker",
                label="Select a theme:",
                # These choices are filled in by the server logic
                selected=None,
                choices=[],
            ),
            ui.output_ui("shinyswatch_theme_picker_output"),
        ),
        theme_picker_deps(),
    )


def theme_picker_deps() -> list[HTMLDependency]:
    return [
        HTMLDependency(
            name="shinyswatch-theme-picker",
            # Uses Bootstrap version so that its served path is the same as the
            # shinyswatch bootswatch.min.css dependency.
            version=bsw5_version,
            source={"package": "shinyswatch", "subdir": "picker"},
            stylesheet={"href": "theme_picker.css"},
            script={"src": "theme_picker.js"},
        ),
    ]


def theme_picker_server() -> None:
    """
    Theme picker - Server

    This function adds the necessary server logic for the theme picker UI to properly
    update. Be sure to include :func:`~shinyswatch.theme_picker_ui` in your UI
    definition.

    Examples
    --------

    ```{.python}
    def server(input):
        shinyswatch.theme_picker_server()

        # The rest of your server logic...
    ```

    See Also
    --------
    * :func:`~shinyswatch.theme_picker_ui`
    """

    session = require_active_session(None)
    input = session.input

    async def remove_theme_picker_warning():
        await session.send_custom_message("shinyswatch-hide-warning", {})

    @reactive.effect
    @reactive.event(input.__shinyswatch_initial_theme)
    async def _():
        await remove_theme_picker_warning()

        init_theme_name = input.__shinyswatch_initial_theme()["name"]
        last_theme = input.__shinyswatch_initial_theme()["saved"]

        choices = set([*ui.Theme.available_presets(), *bsw5_themes])
        choices = sorted([str(x) for x in choices])
        if init_theme_name and init_theme_name not in choices:
            choices = [init_theme_name, *choices]

        if last_theme and last_theme not in choices:
            last_theme = None

        ui.update_select(
            "shinyswatch_theme_picker",
            choices=choices,
            selected=last_theme or init_theme_name or "",
        )

    @reactive.effect
    @reactive.event(input.shinyswatch_theme_picker)
    async def _():
        theme = None
        dep = None

        if input.shinyswatch_theme_picker() in bsw5_themes:
            theme = get_theme(input.shinyswatch_theme_picker())
        elif input.shinyswatch_theme_picker() in ui.Theme.available_presets():
            theme = ui.Theme(preset=input.shinyswatch_theme_picker())

        if theme is not None:
            dep = theme._html_dependencies()  # pyright: ignore[reportPrivateUsage]
            dep = session._process_ui(dep)[  # pyright: ignore[reportPrivateUsage]
                "deps"
            ][0]

        await session.send_custom_message(
            "shinyswatch-pick-theme",
            {
                "theme": input.shinyswatch_theme_picker(),
                "dep": dep,
            },
        )

    @reactive.effect
    async def _():
        await remove_theme_picker_warning()
