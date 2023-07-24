from typing import Callable

from htmltools import Tag, TagList
from htmltools._core import Version
from shiny import App, Inputs, Outputs, Session, reactive, render, req, ui
from starlette.requests import Request as StarletteRequest

import shinyswatch

from ._bsw5 import BSW5_THEME_NAME, bsw5_themes


# TODO: DOCS
def theme_picker(app: App, *, default_theme: BSW5_THEME_NAME = "superhero") -> App:
    theme_obj: dict[str, BSW5_THEME_NAME] = {"theme": default_theme}

    def get_theme() -> BSW5_THEME_NAME:
        return theme_obj.get("theme", default_theme)

    def set_theme(theme: BSW5_THEME_NAME):
        nonlocal theme_obj
        theme_obj["theme"] = theme

    counter = 1

    def theme_ui(request: StarletteRequest) -> Tag:
        nonlocal counter
        counter = counter + 1

        theme_deps = shinyswatch.get_theme(get_theme())
        for theme_dep in theme_deps:
            # Use a high value to override anything else being used
            theme_dep.version = Version(f"9999.{counter}")

        def app_ui():
            if callable(app.ui):
                return app.ui(request)
            else:
                rendered_ui = app.ui
                return TagList(
                    ui.HTML(rendered_ui["html"]),
                    rendered_ui["dependencies"],
                )

        return ui.tags.div(
            theme_deps,
            ui.tags.script(
                """
                Shiny.addCustomMessageHandler('refresh', function(message) {
                    window.location.reload();
                });
                """
            ),
            ui.input_select(
                id="shinyswatch_theme_picker",
                label="Select a theme:",
                selected=get_theme(),
                choices=bsw5_themes,
            ),
            app_ui(),
        )

    def theme_server(input: Inputs, output: Outputs, session: Session):
        @reactive.Effect
        @reactive.event(input.shinyswatch_theme_picker, ignore_none=True)
        async def _():
            if input.shinyswatch_theme_picker() == get_theme():
                return

            print("setting theme: ", input.shinyswatch_theme_picker())
            set_theme(input.shinyswatch_theme_picker())
            await session.send_custom_message("refresh", {})

        # Pass through to the user's server function
        app.server(input, output, session)

    theme_picker_app = App(theme_ui, theme_server)

    return theme_picker_app
