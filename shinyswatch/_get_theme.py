from __future__ import annotations

import os

from htmltools import HTMLDependency

from ._assert import assert_theme
from ._bsw5 import BSW5_THEME_NAME, bsw5_version
from ._shiny_theme import shiny_theme


def get_theme(name: BSW5_THEME_NAME) -> list[HTMLDependency]:
    """
    Create a Bootswatch and Bootstrap 5 theme for Shiny.

    Parameters
    ----------
    name
        A Bootswatch theme name.

    Returns
    -------
    A list of HTML dependencies.

    Example
    --------

    .. code-block:: python

        # File: app.py
        from shiny import App, Inputs, Outputs, Session, render, ui

        import shinyswatch

        app_ui = ui.page_fluid(
            # Theme code - start
            shinyswatch.get_theme("darkly"),
            # Theme code - end
            ui.input_slider("num", "Number:", min=10, max=100, value=30),
            ui.output_text_verbatim("slider_val"),
        )

        def server(input: Inputs, output: Outputs, session: Session):
            @output
            @render.text
            def slider_val():
                return f"{input.num()}"


        app = App(app_ui, server)



    >>> from shinyswatch import theme
    """

    assert_theme(name=name)

    subdir = os.path.join(os.path.dirname(__file__), "bsw5", name)

    # Contains both bootstrap and bootswatch css
    html_dep = HTMLDependency(
        name=f"bootswatch-{name}-and-bootstrap",
        version=bsw5_version,
        source={"package": "shinyswatch", "subdir": subdir},
        stylesheet=[{"href": "bootswatch.min.css"}],
    )

    return shiny_theme(html_dep=html_dep)
