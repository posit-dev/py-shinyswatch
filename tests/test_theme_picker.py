import pytest

import shinyswatch


def test_theme_picker_deprecated_default():
    with pytest.warns(RuntimeWarning, match="deprecated"):
        shinyswatch.theme_picker_ui(default="deprecated")  # type: ignore
