import htmltools

import shinyswatch


def test_error_messages():
    try:
        shinyswatch.get_theme("not-a-theme")  # type: ignore
    except ValueError as e:
        assert "Bootswatch theme" in str(e)
        assert "* cerulean" in str(e)
        assert "* superhero" in str(e)


def test_theme_class():
    cerulean_theme = shinyswatch.get_theme("cerulean")
    assert isinstance(cerulean_theme, list)
    for dep in cerulean_theme:
        assert isinstance(dep, htmltools.HTMLDependency)


def test_theme_names():
    for theme_name in shinyswatch.theme.__all__:
        shinyswatch.get_theme(theme_name)
