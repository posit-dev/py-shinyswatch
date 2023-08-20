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

> Note: When writing shiny apps on [shinylive.io](https://shinylive.io/py/editor/#code=NobwRAdghgtgpmAXGKAHVA6VBPMAaMAYwHsIAXOcpMAMwCdiYACAZwAsBLCbJjmVYnTJMAgujxM6lACZw6EgK4cAOhFVpUAfSVMAvEyVYoAcziaaAGyXSAFKqYODHDF1QKymlhY6y6dyMr4TIEAcoESAAwSAIwRUUwATBEAlHj2jobE7m4eFAAeHgBucgBGUGR8-mQFgamqyaqNELI0rHLFfq7uEllkORIscCwsHKTJiOkOAAK9OZNMU1LNchj5ZPMtTNVkNuPzjpJwZAp0EEw0gRAAVAm8LEwgXWQYELtMV4kAvoFN6uh6onQNg02g4A3acgaEDAnwAukA), remember to add `shinyswatch` to your `requirements.txt` file!

### Theme picker

To add a theme picker to your app, add the `shinyswatch.theme_picker_ui()` in place of your theme object and add `shinyswatch.theme_picker_server()` into your `server` definition.

Demo: [shinylive.io](https://shinylive.io/py/editor/#code=NobwRAdghgtgpmAXGKAHVA6VBPMAaMAYwHsIAXOcpMAMwCdiYACAZwAsBLCbJjmVYnTJMAgujxMAkhFQBXMiwkB5eXIUSAynBYsOpCXUoATOHQmyOAHQjW+Aoa07cWAdyhlCba9bSoA+hZMALxMFlhQAOZwfjQANhZGABTWTKlMAMRMACpscPBMqByEANamTAC0rGRQQilp7FzYru6eGGS58H6FJaYBHIkAlHh1qZk5eXAFRaV0FUzGI6EcGFxqfiyxHCZ0yZCyMJb4TIcAcvsARqaIhxIwXEEAjAAMt1AAHo9PL0wAblDxcCCAGYnkNFmFiKp5H4KG8yH4fqZzu4+LsNlten9YocwRABt4bBATDRWKZETtVvJEFIZPJFExIWQ1NSVEy6RIWNpdKRqVodHo8dcIGkMmMOpNujM5ixqrVhfUnE03B42G1xV1pr1OXRyYNFukxRMpj1ZpUFoSRQABRlqRaWwxE0xtOBwxbE1ibbYI-6DIUikWGMiyOjCmiHECUsgYCD7QYAX0OBJ86GConQiV8fQ5ZNM+MJYDjeHA0Hg1EMAEcLIZ4OQWG04fgiKQKFRkA1nMrPAWALpAA)



## Development

If you want to do development on shinyswatch for Python:

```sh
pip install -e ".[dev,test,docs]"
```

### Examples

There are multiple examples in the shinyswatch repo.

<!-- You can view them online at: [shinyswatch.theme.darkly](http://rstudio.github.io/py-shinyswatch/reference/theme.darkly.html) and [get_theme](http://rstudio.github.io/py-shinyswatch/reference/get_theme.html). -->

To run the demos locally, you can run the examples by calling:

```sh
python3 -m shiny run examples/basic-darkly/app.py
python3 -m shiny run examples/big-sketchy/app.py
python3 -m shiny run examples/components/app.py
python3 -m shiny run examples/theme-picker/app.py
```
