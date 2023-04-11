from shiny import App, Inputs, Outputs, Session, render, ui

import shinyswatch

app_ui = ui.page_fluid(
    shinyswatch.theme("darkly"),
    ui.input_slider("num", "Number:", min=10, max=100, value=30),
    ui.output_text_verbatim("slider_val"),
)


def server(input: Inputs, output: Outputs, session: Session):
    @output
    @render.text
    def slider_val():
        return f"{input.num()}"


app = App(app_ui, server)
