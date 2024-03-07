# pyright: reportAttributeAccessIssue=false
import matplotlib.pyplot as plt
import numpy as np
from shiny import App, render, ui

import shinyswatch

app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_slider("n", "N", min=0, max=100, value=20),
        shinyswatch.theme_picker_ui(),
    ),
    ui.card(ui.output_plot("plot")),
    title="Shiny Sidebar Page",
)


def server(input):
    shinyswatch.theme_picker_server()

    @render.plot(alt="A histogram")
    def plot():
        np.random.seed(19680801)
        x = 100 + 15 * np.random.randn(437)

        fig, ax = plt.subplots()
        ax.hist(x, input.n(), density=True)

        # Theme the plot to match light/dark mode
        fig.patch.set_facecolor("none")
        ax.set_facecolor("none")

        color_fg = "#999999"
        ax.tick_params(axis="both", colors=color_fg)
        ax.spines["bottom"].set_color(color_fg)
        ax.spines["top"].set_color(color_fg)
        ax.spines["left"].set_color(color_fg)
        ax.spines["right"].set_color(color_fg)

        return fig


app = App(app_ui, server)
