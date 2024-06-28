import htmltools
import pytest

import shinyswatch
import shinyswatch._bsw5 as bsw5


def test_error_messages():
    try:
        shinyswatch.get_theme("not-a-theme")  # type: ignore
    except ValueError as e:
        assert "Bootswatch theme" in str(e)
        assert "* cerulean" in str(e)
        assert "* superhero" in str(e)


def test_themes():
    for theme_name in bsw5.bsw5_themes:
        theme_obj = shinyswatch.get_theme(theme_name)

        # Assert base theme can use precompiled CSS. If this fails, it's likely that
        # `py-shinyswatch` is no longer up-to-date with `py-shiny`.
        cant_precompile = (
            "Is py-shinyswatch up-to-date with py-shiny? "
            + "If not, update py-shiny and run `python scripts/update_themes.py`."
        )
        assert theme_obj._can_use_precompiled(), cant_precompile

        theme_deps = theme_obj._html_dependency()

        # assert all returned html deps are HTMLDependencies
        assert isinstance(theme_deps, htmltools.HTMLDependency)
        assert theme_deps.name == f"shinyswatch-css-{theme_name}"
        assert theme_deps.stylesheet[0]["href"] == "bootswatch.min.css"

        # themes are not tagifiable, need to be provided to `ui.page_*(theme=theme_obj)`
        with pytest.raises(SyntaxError):
            theme_obj.tagify()
