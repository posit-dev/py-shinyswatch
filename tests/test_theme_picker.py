import htmltools
import pytest
import shiny

import shinyswatch
from shinyswatch._bsw5 import BSW5_THEME_NAME, bsw5_themes


def test_theme_picker_deprecated_default():
    with pytest.warns(RuntimeWarning, match="deprecated"):
        shinyswatch.theme_picker_ui(default="deprecated")  # type: ignore


@pytest.mark.parametrize("name", bsw5_themes)
def test_theme_picker_expects_single_stylesheet_shinyswatch(name: BSW5_THEME_NAME):
    deps = shinyswatch.get_theme(name)._html_dependency()

    assert isinstance(deps, htmltools.HTMLDependency)
    # We expect that the shiny.ui.Theme() is a dependency containing a single stylesheet
    assert len(deps.stylesheet) == 1
    assert len(deps.script) == 0


def test_theme_picker_expects_single_stylesheet_shiny():
    deps = shiny.ui.Theme()._html_dependency()

    assert isinstance(deps, htmltools.HTMLDependency)
    # We expect that the shiny.ui.Theme() is a dependency containing a single stylesheet
    assert len(deps.stylesheet) == 1
    assert len(deps.script) == 0
