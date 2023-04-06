import htmltools

import shinyswatch


def test_error_messages():
    try:
        shinyswatch.theme("not-a-theme")
    except ValueError as e:
        assert "Bootswatch theme" in str(e)
        assert "* cerulean" in str(e)
        assert "* superhero" in str(e)


def test_theme_class():
    cerulean_theme = shinyswatch.theme("cerulean")
    assert isinstance(cerulean_theme, list)
    for dep in cerulean_theme:
        assert isinstance(dep, htmltools.HTMLDependency)
