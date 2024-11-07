import htmltools
import pytest
import shiny

import shinyswatch
from shinyswatch._bsw5 import BSW5_THEME_NAME, bsw5_themes


def get_theme_deps(theme: shiny.ui.Theme) -> htmltools.HTMLDependency:
    if hasattr(theme, "_html_dependency"):
        # shiny < v1.2.0
        deps = getattr(theme, "_html_dependency")()
    else:
        deps = getattr(theme, "_html_dependencies")()
        # In shiny >= v1.2.0, `_html_dependencies()` returns a list of deps, but for
        # shinyswatch we're expecting the default case to be a single dependency.
        assert isinstance(deps, list)
        assert len(deps) == 1
        deps = deps[0]

    return deps


def test_theme_picker_deprecated_default():
    with pytest.warns(RuntimeWarning, match="deprecated"):
        shinyswatch.theme_picker_ui(default="deprecated")  # type: ignore


def expect_single_stylesheet(theme: shiny.ui.Theme):
    deps = theme._html_dependencies()
    assert isinstance(deps, list)
    assert len(deps) == 1

    deps = deps[0]
    assert isinstance(deps, htmltools.HTMLDependency)
    # We expect that the shiny.ui.Theme() is a dependency containing a single stylesheet
    assert len(deps.stylesheet) == 1
    assert len(deps.script) == 0


@pytest.mark.parametrize("name", bsw5_themes)
def test_theme_picker_expects_single_stylesheet_shinyswatch(name: BSW5_THEME_NAME):
    expect_single_stylesheet(shinyswatch.get_theme(name))


def test_theme_picker_expects_single_stylesheet_shiny():
    expect_single_stylesheet(shiny.ui.Theme())
