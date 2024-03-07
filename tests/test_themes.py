import htmltools

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
        theme_deps = theme_obj()

        # assert all `_html_deps` are HTMLDependencies
        assert isinstance(theme_deps, list)
        for dep in theme_deps:
            assert isinstance(dep, htmltools.HTMLDependency)

        # assert all tagified theme values are HTMLDependencies
        tagified_theme = theme_obj.tagify()
        assert isinstance(tagified_theme, htmltools.TagList)
        for item in tagified_theme:
            assert isinstance(item, htmltools.HTMLDependency)
