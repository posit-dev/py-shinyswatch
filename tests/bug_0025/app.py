from shiny import App, Inputs, Outputs, Session, ui

import shinyswatch

app_ui = ui.page_navbar(
    shinyswatch.theme.cosmo(),
    ui.nav_menu(
        "Config",
        ui.nav_panel("Config 1"),
        ui.nav_panel("Config 2"),
    ),
    ui.nav_menu(
        "Results",
        ui.nav_panel("Results 1"),
        ui.nav_panel("Results 2"),
    ),
)


def server(input: Inputs, output: Outputs, session: Session):
    pass


app = App(app_ui, server)
