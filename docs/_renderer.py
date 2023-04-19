# pyright: reportPrivateImportUsage=false
# pyright: reportGeneralTypeIssues=false

from __future__ import annotations

import html
import re
from pathlib import PurePath
from typing import Union

import quartodoc.ast as qast
from griffe import dataclasses as dc
from griffe.docstrings import dataclasses as ds
from plum import dispatch
from quartodoc import MdRenderer
from quartodoc.renderers.base import convert_rst_link_to_md, sanitize

ROOT_PATH = PurePath(__file__).parent.parent
demo_app_path = ROOT_PATH / "examples" / "components" / "app.py"
with open(demo_app_path) as f:
    demo_app_code = f.read()

APP_TMPL = (
    demo_app_code.replace("{", "{{")
    .replace("}", "}}")
    .replace("shinyswatch.theme.superhero()", "shinyswatch.theme.{theme_name}()")
)

SHINYLIVE_TMPL = """```{{shinylive-python}}
#| standalone: true
#| components: [editor, viewer]
#| layout: vertical
#| viewerHeight: 800
## file: app.py
{app_code}

## file: requirements.txt
Jinja2
pandas
shiny
shinyswatch

```
"""


DOCSTRING_TMPL = """\
{rendered}

{header} Examples

{examples}
"""


class Renderer(MdRenderer):
    style = "shiny"

    @dispatch
    def render(self, el: qast.DocstringSectionSeeAlso):
        # The See Also section in the Shiny docs has bare function references, ones that
        # lack a leading :func: and backticks. This function fixes them. In the future,
        # we can fix the docstrings in Shiny, once we decide on a standard. Then we can
        # remove this function.
        return prefix_bare_functions_with_func(el.value)

    @dispatch
    def render(self, el: Union[dc.Object, dc.Alias]):
        rendered = super().render(el)

        converted = convert_rst_link_to_md(rendered)

        if el.module.name != "theme":
            return converted

        app_code = APP_TMPL.format(theme_name=el.name)
        example = SHINYLIVE_TMPL.format(app_code=app_code)
        converted_with_examples = DOCSTRING_TMPL.format(
            rendered=converted,
            header="#" * (self.crnt_header_level + 1),
            examples=example,
        )
        return converted_with_examples

    @dispatch
    def render(self, el: ds.DocstringSectionText):
        # functions like shiny.ui.tags.b have html in their docstrings, so
        # we escape them. Note that we are only escaping text sections, but
        # since these cover the top text of the docstring, it should solve
        # the immediate problem.
        rendered = super().render(el)
        return html_escape_except_backticks(rendered)

    @dispatch
    def render_annotation(self, el: str):
        return sanitize(el)

    @dispatch
    def render_annotation(self, el: None):
        return ""

    @dispatch
    def render_annotation(self, el: dc.Expression):
        # an expression is essentially a list[dc.Name | str]
        # e.g. Optional[TagList]
        #   -> [Name(source="Optional", ...), "[", Name(...), "]"]

        return "".join(map(self.render_annotation, el))

    @dispatch
    def render_annotation(self, el: dc.Name):
        # e.g. Name(source="Optional", full="typing.Optional")
        return f"[{el.source}](`{el.full}`)"

    @dispatch
    def summarize(self, el: dc.Object | dc.Alias):
        result = super().summarize(el)
        return html.escape(result)


def html_escape_except_backticks(s: str) -> str:
    """
    HTML-escape a string, except for content inside of backticks.

    Examples
    --------
        s = "This is a <b>test</b> string with `backticks <i>unescaped</i>`."
        print(html_escape_except_backticks(s))
        #> This is a &lt;b&gt;test&lt;/b&gt; string with `backticks <i>unescaped</i>`.
    """
    # Split the string using backticks as delimiters
    parts = re.split(r"(`[^`]*`)", s)

    # Iterate over the parts, escaping the non-backtick parts, and preserving backticks in the backtick parts
    escaped_parts = [
        html.escape(part) if i % 2 == 0 else part for i, part in enumerate(parts)
    ]

    # Join the escaped parts back together
    escaped_string = "".join(escaped_parts)
    return escaped_string


def prefix_bare_functions_with_func(s: str) -> str:
    """
    The See Also section in the Shiny docs has bare function references, ones that lack
    a leading :func: and backticks. This function fixes them.

    If there are bare function references, like "~shiny.ui.panel_sidebar", this will
    prepend with :func: and wrap in backticks.

    For example, if the input is this:
        "~shiny.ui.panel_sidebar  :func:`~shiny.ui.panel_sidebar`"
    This function will return:
        ":func:`~shiny.ui.panel_sidebar`  :func:`~shiny.ui.panel_sidebar`"
    """

    def replacement(match: re.Match[str]) -> str:
        return f":func:`{match.group(0)}`"

    pattern = r"(?<!:func:`)~\w+(\.\w+)*"
    return re.sub(pattern, replacement, s)
