"""Bootswatch + Bootstrap 5 themes for Shiny"""

__version__ = "0.1.1"

from . import theme
from ._get_theme import get_theme

__all__ = (
    "theme",
    "get_theme",
)
