import matplotlib.pyplot as plt
import numpy as np
from shiny import App, render, req, ui

# Try changing the theme from minty to united
from shinyswatch.theme import minty as shiny_theme

app_ui = ui.page_fluid(
    ui.input_slider("n", "N", min=0, max=100, value=20),
    ui.card(ui.output_plot("plot")),
    theme=shiny_theme,
)


def server(input):
    @render.plot(alt="A histogram")
    def plot():
        np.random.seed(19680801)
        x = 100 + 15 * np.random.randn(437)

        fig, ax = plt.subplots()
        ax.hist(x, input.n(), density=True, color=shiny_theme.colors.primary)

        # Theme the plot to match the current theme
        fig.patch.set_facecolor("none")
        ax.set_facecolor("none")

        color_fg = shiny_theme.colors.body_color
        ax.tick_params(axis="both", colors=color_fg)
        ax.spines["bottom"].set_color(color_fg)
        ax.spines["top"].set_color(color_fg)
        ax.spines["left"].set_color(color_fg)
        ax.spines["right"].set_color(color_fg)

        return fig


app = App(app_ui, server)
