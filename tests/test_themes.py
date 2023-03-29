import typing

import htmltools
import pytest

import shinyswatch


@pytest.mark.parametrize("func", [shinyswatch.theme, shinyswatch.theme_cdn])
def test_error_messages(
    func: typing.Callable[
        [
            str,
            str,
        ],
        htmltools.HTMLDependency,
    ]
):
    try:
        shinyswatch.theme("not-a-theme")
    except ValueError as e:
        assert "Bootswatch theme" in str(e)
        assert "* cerulean" in str(e)
        assert "* superhero" in str(e)
    try:
        shinyswatch.theme("not-a-theme", bs_ver="not-a-version")
    except ValueError as e:
        assert "Bootswatch version" in str(e)


def test_theme_class():
    assert isinstance(shinyswatch.theme("cerulean"), htmltools.HTMLDependency)
