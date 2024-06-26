# shinyswatch


[Bootswatch](https://bootswatch.com/) + Bootstrap 5 themes for
[Shiny](https://shiny.rstudio.com/py/).

Here are just three of the **25 themes** in shinyswatch:

| Minty                                                                                      | Sketchy                                                                                        | Superhero                                                                                          |
|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| ![Minty](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_minty.png) | ![Sketchy](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_sketchy.png) | ![Superhero](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_superhero.png) |

## Installation

``` sh
pip install shinyswatch
```

To install the latest development version from this repository:

``` sh
pip install https://github.com/rstudio/py-shinyswatch/tarball/main
```

## Usage

To use a theme, add a `shinyswatch.theme` theme object to your App’s UI
definition.

``` python
# Minty theme
shinyswatch.theme.minty

# Sketchy theme
shinyswatch.theme.sketchy

# Superhero theme
shinyswatch.theme.superhero
```

Example Shiny application:

<table>
<thead>
<tr>
<th>
File: <code>app.py</code>
</th>
<th>
Screenshot
</th>
</tr>
</thead>
<tbody>
<tr>
<td>

``` python
from shiny import App, Inputs, Outputs, Session, render, ui

import shinyswatch

app_ui = ui.page_fluid(
    # Theme code - start
    shinyswatch.theme.darkly,
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

</td>
<td>

![darkly
theme](https://raw.githubusercontent.com/rstudio/py-shinyswatch/v0.2.2/readme_darkly.png)

</td>
</tr>
</tbody>
</table>

> Note: When writing [shiny apps that use shinyswatch on
> shinylive.io](https://shinylive.io/py/editor/#code=NobwRAdghgtgpmAXAAjFADugdOgnmAGlQGMB7CAFzkqVQDMAnUmZAZwAsBLCXZTmdKQYVkAQUxEAkhHQBXCqyIB5eXIVEAynFatO5Ig2oATOAyKzOAHQjX+g4Wy49WAdygVi7a9YzoA+hbIALzIFjhQAOZwfnQANhZGABTWyKnIAMTIACrscPDIZCbIALRsFFDCKWkc3Liu7p5YFLnwWEYVANaxuARVqZk5eXAFpEWlxn2hnFjcan6ssZwmDMmQsjCWhMibAHLrAEamiJtEMNxBAIwADKdQAB6XVzfIAG5Q8XBBAMxXAJS9EDSUywpFU8j8VDuFD8L1M+3c-FWCyWphh702-2sv28NggJjobFMsJWs3kKGkakUyFBFDUKBUtPkVNY2l05BQWh0eggv2OgLSAAEaWpJgLDHjTE04FDJvi2ItlmjYoleZMgYYKLIGIC6JsQKSKFgIOsVQBfTY4nyYYJiTCJXwBThEFkMYnYiBbMAUXDoBAoL3SihgU1EcDQeC0MCGACOFkM8EorCaUM9ZEo1CD-pqPGs2bqbg8Xg9RC9Pr9qEhQdNAF0gA),
> remember to add `shinyswatch` to your `requirements.txt` file!

## Theme picker

To add a theme picker to your app, add the theme picker UI and server
functions to your app’s UI and server definitions.

[Demo **theme picker** app on
shinylive.io](https://shinylive.io/py/editor/#code=NobwRAdghgtgpmAXAAjFADugdOgnmAGlQGMB7CAFzkqVQDMAnUmZAZwAsBLCXZTmdKQYVkAQUxEAkhHQBXCqyIB5eXIVEAynFatO5Ig2oATOAyKzOAHQjX+g4Wy49WAdygVi7a9YzoA+hbIALzIFjhQAOZwfnQANhZGABTWyKnIAMTIACrscPDI6JzEANamyAC0bBRQwilpHNy4ru6eWBS58H6FJaYBnIkAlAR1qZk5eXAFRaUMFcjGI6GcWNxqfqyxnCYMyZCyMJaEyIcAcvsARqaIh0Qw3EEAjAAMt1AAHo9PL8gAblDxcCCAGYnkNFmFSKp5H4qG8KH4fqZzu5+LsNlten9YocwRABt4bBATHQ2KZETtVvIUNI1IpkJCKGoUCpGfI6axtLpyCgtDo9HjrhA0hkxh1Jt0ZnNWNVakL6k4mm4POw2mKutNehyGOTBot0qKJlMerNKgtCcKAAIMtSLC2GImmNpwOGLYlsTbbBH-QaC4XCwwUWQMIV0Q4gSkULAQfaDAC+hwJPkwwTEmESvj6RC15PxECOYAouHQCBQBedFDAsaI4Gg8FoYEMAEcLIZ4JRWG04fmyJRqBXSw0eNZB4qWl480QC0WS6hYRXYwBdIA).

## Plot Theming

shinyswatch themes include a `.colors` attribute that can be used to
theme plots or other outputs and UI elements. In the example below, try
changing the theme and re-running the app to see how the plot changes.

[Demo **plot theming** app on
shinylive.io](https://shinylive.io/py/editor/#code=NobwRAdghgtgpmAXAAjFADugdOgnmAGlQGMB7CAFzkqVQEsZ1SAnC5GKC9AG1Iu7oAjHLh59kUAM7IeFADoQGTVsggBXRrgnSI6BQDNmpGMkkALOhC1KWbAIKYizagBM4zJ3ACORNXQUKAMTIACrMWsRmUBAA5pYxyBRmcInJ8MiGxuyWFFoUpMhqilQuBkYm5pa4kgDunJFYSXDpNiowOVpSphZWAPpN8AHQmL1+yAC8hXQ4UDFwvfrcfi4AFArIG91V-WlwBOubfliW6GoUvZICbsxrkHKEyPcAcvdE7RDjAAxvUAAe4wBGT7fZAANygSzg4wATJ8AJT7CCbKZYYhQZirI6kM6nc5iCi3fH3OEIhRwoYKNz6UzuUHuFYnM5wxAHDYAAWcEGuOF4BIhFHG9zsyAsknyMWYsGJrOQVJkvJWzJlyN0WElXOMWEkcDgqwBAE4AGwADk+poB5KRyM2vwmyCBn2QAGp7QBWZAAKlU2HVLk1vogKwALABmADsluVm30dBiRD+dtkWrUgnxkkVUY2fywooJvyIjIoWEDCNl1EkdFy4zCaj2yDIvGY40qfQGcFRpEbkhwzAY6Nwkat1uQwRCu1SKXxiQKHAokQn9bUzE5bDbmYysZmc7MWrg530UGIcAbLFuEHIcGlQ+t2e1+8Px87p-u54gl7Ag+HGxPzAWCUmLa4DszTtj+3aCKQLhAT+67ZhQdDEAA1r06DorA6Z-HQkiCmAEFJK89ZPsw2E-n+lpfhIvxauglhwJIwD3Hh+QwPcAC6u7nD+KykfoMTkV+t40W+9H3PkehgOxd69FxPF8bBVGSEJdEMWA3BwPo8gSRx0lEdxRFkfJ1G0SJYC9jEZiaZJe46Y2emNgZEDrs4FBLkiMYxBSwzoHaDjoCsGDoKMdBENqzB0swloPGAuToAgKDRXAvwUGAAC+RDgNA8C0KZ3h+M48CUN2FBJVFZCUNQyXxeomgKLO+ICIICiAU1PTVHU24KFFMVxagVAlSlrFAA).

## Development

If you want to do development on shinyswatch for Python:

``` sh
pip install -e ".[dev,test,docs]"
```

### Examples

There are multiple examples in the shinyswatch repo.

<!-- You can view them online at: [shinyswatch.theme.darkly](http://rstudio.github.io/py-shinyswatch/reference/theme.darkly.html) and [get_theme](http://rstudio.github.io/py-shinyswatch/reference/get_theme.html). -->

To run the demos locally, you can run the examples by calling:

``` sh
python3 -m shiny run examples/basic-darkly/app.py
python3 -m shiny run examples/big-sketchy/app.py
python3 -m shiny run examples/components/app.py
python3 -m shiny run examples/theme-picker/app.py
```
