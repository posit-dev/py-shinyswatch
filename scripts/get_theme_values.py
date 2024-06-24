import json

import tinycss2
from shiny.ui import Theme


def get_theme_color_values(theme: Theme):
    # If it matters, should copy the theme to avoid modifying the original
    theme.add_rules(
        """
        #values {
            --value: {
            "body_color": "#{$body-color}",
            "body_bg": "#{$body-bg}",
            "light": "#{$light}",
            "dark": "#{$dark}",
            "primary": "#{$primary}",
            "secondary": "#{$secondary}",
            "info": "#{$info}",
            "success": "#{$success}",
            "warning": "#{$warning}",
            "danger": "#{$danger}"
            }
        }
        """
    )

    theme_css = theme.to_css()

    rules = tinycss2.parse_stylesheet(theme_css)
    value_rule = [rule for rule in rules if is_value_rule(rule)][0]
    value = [
        value
        for value in value_rule.content
        if isinstance(value, tinycss2.ast.CurlyBracketsBlock)
    ]
    return json.loads(value[0].serialize())


def is_value_rule(rule):
    return (
        isinstance(rule, tinycss2.ast.QualifiedRule)
        and isinstance(rule.prelude[0], tinycss2.ast.HashToken)
        and rule.prelude[0].value == "values"
    )
