from ._themes import themes, versions

newline_and_star = "\n* "


def _assert_bs_ver(*, bs_ver: str) -> None:
    if type(bs_ver) is not str:
        raise TypeError("`bs_ver` must be a string")
    if bs_ver not in versions:
        supported_versions = newline_and_star.join(versions.keys())
        raise ValueError(
            f"Bootswatch version `{bs_ver}` not supported. Supported versions:{newline_and_star}{supported_versions}"
        )


def _assert_bs_theme(*, bs_ver: str, name: str) -> None:
    if type(name) is not str:
        raise TypeError("`name` must be a string")
    if name not in themes[bs_ver]:
        theme_names = newline_and_star.join(themes[bs_ver])
        raise ValueError(
            f"Bootswatch theme `{name}` not supported. Bootswatch version `{bs_ver}` has themes:{newline_and_star}{theme_names}"
        )


def assert_theme(*, name: str, bs_ver: str = "5") -> None:
    _assert_bs_ver(bs_ver=bs_ver)
    _assert_bs_theme(bs_ver=bs_ver, name=name)
