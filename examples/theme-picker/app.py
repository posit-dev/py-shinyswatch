import pandas as pd
from shiny import App, render, ui

import shinyswatch

app_ui = ui.page_navbar(
    ui.nav(
        "Navbar 1",
        # !! DO NOT INCLUDE THEME in `app_ui` !!
        # shinyswatch.theme.superhero(),
        # !! !!
        # Include theme_picker_ui UI module somewhere in your UI
        shinyswatch.theme_picker_ui(),
        ui.layout_sidebar(
            ui.panel_sidebar(
                ui.input_file("file", "File input:"),
                ui.input_text("txt", "Text input:", "general"),
                ui.input_slider("slider", "Slider input:", 1, 100, 30),
                ui.tags.h5("Default actionButton:"),
                ui.input_action_button("action", "Search"),
                ui.tags.h5("actionButton with CSS class:"),
                ui.input_action_button(
                    "action2", "Action button", class_="btn-primary"
                ),
            ),
            ui.panel_main(
                ui.navset_tab(
                    ui.nav(
                        "Tab 1",
                        ui.output_table("table"),
                        ui.tags.h4("Verbatim text output"),
                        ui.output_text_verbatim("txtout"),
                        ui.tags.h1("Header 1"),
                        ui.tags.h2("Header 2"),
                        ui.tags.h3("Header 3"),
                        ui.tags.h4("Header 4"),
                        ui.tags.h5("Header 5"),
                    ),
                    ui.nav("Tab 2", "Tab 2 content"),
                    ui.nav("Tab 3", "Tab 3 content"),
                )
            ),
        ),
    ),
    ui.nav("Plot", "Plot content"),
    ui.nav("Table", "Table content"),
    sidebar=ui.sidebar("Sidebar content"),
    title="shinyswatch",
    inverse=True,
)


def server(input, output, session):
    # Include theme_picker_server server in the root of your server function
    shinyswatch.theme_picker_server()

    @output
    @render.text
    def txtout():
        return f"{input.txt()}, {input.slider()}, {input.slider()}"

    @output
    @render.table
    def table():
        cars = pd.DataFrame({"speed": [4, 4, 7, 7], "dist": [2, 10, 4, 22]})
        return cars


app = App(app_ui, server)
