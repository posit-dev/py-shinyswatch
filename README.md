# shinyswatch

[Bootswatch](https://bootswatch.com/) + Bootstrap 5 themes for [Shiny](https://shiny.rstudio.com/py/).


Here are just three of the **25 themes** in shinyswatch:

| Minty                      | Sketchy                        | Superhero                          |
|----------------------------|--------------------------------|------------------------------------|
| ![Minty](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_minty.png) | ![Sketchy](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_sketchy.png) | ![Superhero](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_superhero.png) |


## Installation

```sh
pip install shinyswatch
```

To install the latest development version from this repository:

```sh
pip install https://github.com/rstudio/py-shinyswatch/tarball/main
```

## Usage

To use a theme, call the theme function and add it to your App's UI definition.

```python
# Minty theme
shinyswatch.theme.minty()

# Sketchy theme
shinyswatch.theme.sketchy()

# Superhero theme
shinyswatch.theme.superhero()
```

Example Shiny application:

<table>
    <thead><tr>
        <th>File: <code>app.py</code></th>
        <th>Screenshot</th>
    </tr></thead>
    <tbody><tr><td>

```python
from shiny import App, Inputs, Outputs, Session, render, ui

import shinyswatch

app_ui = ui.page_fluid(
    # Theme code - start
    shinyswatch.theme.darkly(),
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
```

</td><td>

![darkly theme](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_darkly.png)

</td></tr></tbody></table>

## Development

If you want to do development on shinyswatch for Python:

```sh
pip install -e ".[dev,test]"
```

### Examples

There are three examples in the shinyswatch repo.

<!-- You can view them online at: [shinyswatch.theme.darkly](http://rstudio.github.io/py-shinyswatch/reference/theme.darkly.html) and [get_theme](http://rstudio.github.io/py-shinyswatch/reference/get_theme.html). -->

To run the demos locally, you can run the examples by calling:

```sh
python3 -m shiny run examples/basic-darkly/app.py
# or
python3 -m shiny run examples/big-sketchy/app.py
# or
python3 -m shiny run examples/components/app.py
```
