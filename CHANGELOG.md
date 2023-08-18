# Change Log for shinyswatch

All notable changes to `shinyswatch` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Bug fixes

* Updated themes to support latest py-shiny sidebars. Requires shiny 0.5.0 or later (#15).


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
