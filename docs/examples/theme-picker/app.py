from shiny import App, Inputs, Outputs, Session, render, ui

import shinyswatch

app_ui = ui.page_fluid(
    shinyswatch.theme_picker_ui(),  # <- Add the theme picker UI to your app
    ui.input_slider("num", "Number:", min=10, max=100, value=30),
    ui.output_text_verbatim("slider_val"),
    theme=shinyswatch.theme.zephyr,  # <- Choose an initial theme (optional)
)


def server(input: Inputs, output: Outputs, session: Session):
    # Make sure your server function calls the theme picker server function
    shinyswatch.theme_picker_server()

    @output
    @render.text
    def slider_val():
        return f"{input.num()}"


app = App(app_ui, server)
