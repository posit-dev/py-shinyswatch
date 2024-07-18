# Change Log for shinyswatch

All notable changes to `shinyswatch` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0] - 2024-07-18

### Breaking changes

* shinyswatch now requires shiny v1.0.0 or newer to use the newly-introduced `shiny.ui.Theme()` class to define themes. As a result, `shinyswatch.theme.{name}` objects can no longer be added anywhere in the app's UI. Instead, pass a shinyswatch theme to the `theme` argument of any `shiny.ui.page_*()` functions (Shiny Core) or to `shiny.express.ui.page_opts()` (Shiny Express). (#39)

* The `default` argument of `theme_picker_ui()` is now deprecated. Instead, pass the initial theme to the `theme` argument of any `shiny.ui.page_*()` functions (Shiny Core) or to `shiny.express.ui.page_opts()` (Shiny Express). This change separates the initial theme selection from the placement of the theme picker input. (#39)

* `shinyswatch.get_theme_deps()` was removed from the package. If needed, use the `._html_dependency()` method of the theme object. (#39)

### New features

* As mentioned above, shinyswatch now uses the `shiny.ui.Theme()` class to define themes, making shinyswatch themes customizable using the `.add_defaults()`, `.add_rules()` and other methods of the `shiny.ui.Theme()` class. Customized themes are recompiled from Sass to CSS, which requires the [libsass package](https://sass.github.io/libsass-python/). (#39)

* The theme picker now includes Shiny's default theme (as `"shiny"`) and bare Bootstrap (as `"bootstrap"`) as theme options, in addition to the Bootswatch themes. If the initial app theme is a custom `shiny.ui.Theme()`, the custom theme is also included in the theme picker options. (#39)

* The theme picker will now remember the previous theme selection between app uses when the app is re-loaded in the same browser. (#43)

## [0.6.1] - 2024-04-23

* Include missing theme picker assets in the package. (#36)

## [0.6.0] - 2024-04-16

### New features

* `shinyswatch.theme_picker_ui()` gains a `default` argument to set the initial theme. (#22)

### Internal changes

* We've restructured the dependencies used to provide a shinyswatch theme.  This change should not affect users of shinyswatch, but it will prevent accidentally including more than one shinyswatch themes on the same page. (#32)

* The theme picker now transitions between themes more smoothly. That said, we do still recommend using the theme picker only while developing your app. (#32)

## [0.5.1] - 2024-03-07

* Add typed attributes in the theme's color class for stronger type checking.

## [0.5.0] - 2024-03-07

### Breaking changes

* `shinyswatch.get_theme(name)` now returns a tagifiable class instance of the theme. This callable class instance may be executed to retrive the html dependencies. To resolve some rare typing issues, either execute the returned theme object to directly use the html dependencies or use `shinyswatch.get_theme_deps(name)`. (#29)

```python
# before
theme_deps = shinyswatch.get_theme("yeti")

# after (option 1)
theme_deps = shinyswatch.get_theme_deps("yeti")
# after (option 2)
theme_obj = shinyswatch.get_theme("yeti")
theme_deps = theme_obj()
```

### New features

* Themes in `shinyswatch.theme` are now tagifiable class instances. You no longer need to call the theme as a function, e.g. `shinyswatch.theme.yeti`. Existing code calling the theme, e.g. `shinyswatch.theme.yeti()`, will continue to work as the `__call__` method retrieves the theme's html dependencies. (#29)

* `shinyswatch.theme`'s theme object now includes a `.colors` attribute with the theme's color palette, including colors like `body_color`, `body_bg`, `primary`, `secondary`, etc.  You can use these colors to theme plots, outputs and other UI elements to match the shinyswatch theme. (#29)

### Updates

* Update bootswatch themes to receive page_sidebar updates and require shiny v0.8.1 (#28)

* Update bootswatch themes to receive posit-dev/py-shiny#1124 updates to fix navbar theming (#26)

## [0.4.2] - 2023-12-22

* Update bootswatch themes. (#24)

## [0.4.1] - 2023-10-31

### New features

* Drop XStatic-bootswatch dependency

## [0.4.0] - 2023-10-31

### New features

* Update themes to support Bootstrap 5.3 (#20)

## [0.3.1] - 2023-08-20

### Bug fixes

* Actually include the new ion range slider files in the package (#18).

## [0.3.0] - 2023-08-20

### New features

* Added `shinyswatch.theme_picker_ui()` and `shinyswatch.theme_picker_server()` to allow users to select a theme from a dropdown menu. When changing themes, a page refresh will occur (#11).

### Bug fixes

* Updated themes to support latest shiny sidebars. Requires shiny 0.5.0 or later (#15).

* Dropped support for python 3.7 as shiny does not support python 3.7 (#16).

## [0.2.4] - 2023-04-18

### Bug fixes

* Added return types to `theme()` methods.  (#6)

* Update bootswatch themes. (8b80ed0)

## [0.2.2] - 2023-04-18

### Other changes

* Use external images for README.md so that PyPI can render them. (ff23b59)

## [0.2.1] - 2023-04-18

### Other changes

* Update README.md

## [0.2.0] - 2023-04-14

### New features

* `theme` module contains 25 theme methods that wrap `get_theme()`. (#4)

* Generic `get_theme()` method returns an HTML Dependency that overwrites the default `bootstrap` theme with the `bootswatch` theme.  The returned HTML Dependency requires internet to load fonts.  (#4)
