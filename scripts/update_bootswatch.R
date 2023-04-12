#!/usr/bin/env Rscript

library(bslib)
library(rlang)

# == Approach ================================================================
# We MUST use `{bslib}` themes as the original bootswatch themes
# have been modified to support Shiny markup. Ex: `.well`.
# The final bslib themes have already had their web font paths replaced
# with local paths, so we need to revert them back to the original CDN paths.
# We do this by downloading the original bootswatch themes from npm and
# parsing the original CDN paths from the original Sass files.
# If any unexpected URL-like variables are found, an error will be thrown.
# ===========================================================================

root <- here::here()
lib <- file.path(root, "shinyswatch")
withr::local_dir(root)

ver <- "5"
npm_tag <- names(bslib::versions()[bslib::versions() == ver])


# Download bootswatch from npm to get original urls that are stripped in {bslib}
if (!nzchar(Sys.which("npm"))) {
  stop("npm is required to run this script")
}
extra_args <- " --package-lock false --no-save --silent"
system(paste0("npm uninstall bootswatch", extra_args))
system(paste0("npm install bootswatch@", npm_tag, extra_args))
bootswatch_npm_dist <- file.path(root, "node_modules", "bootswatch", "dist")

# Setup save directories
out_dir <- file.path(lib, paste0("bsw", ver))
unlink(out_dir, recursive = TRUE)
dir.create(out_dir, recursive = TRUE)

# Save the bootstrap JS files
bs_out_dir <- file.path(lib, paste0("bs", ver))
unlink(bs_out_dir, recursive = TRUE)
dir.create(bs_out_dir, recursive = TRUE)
deps <- bs_theme_dependencies(bs_theme(version = 5))
withr::with_options(
  list(htmltools.dir.version = FALSE),
  {
    for (dep in deps) {
      if (dep$name != "bootstrap") {
        next
      }
      # Do not save the CSS files. These will be added by shinyswatch
      dep$stylesheet <- NULL
      # Do not save all the attachments, just the JS files
      dep$all_files <- FALSE
      # Do not save in `bootstrap` subfolder
      # Only save in `shinyswatch/bs5/`
      dep$name <- ""
      htmltools::copyDependencyToDir(dep, bs_out_dir)
      # Make sure the JS files are consistently named
      if (!file.exists(file.path(bs_out_dir, "bootstrap.bundle.min.js"))) {
        file.rename(
          dir(bs_out_dir, full.names = TRUE, pattern = "\\.js$"),
          file.path(bs_out_dir, "bootstrap.bundle.min.js")
        )
      }
    }
  }
)


# For each theme...
theme_names <- bslib::bootswatch_themes(version = ver)
p <- progress::progress_bar$new(
  total = length(theme_names),
  format = "bs::ver bsw::name - `web-font-url`::status [:bar] :current/:total eta::eta\n", # nolint
  clear = FALSE,
  show_after = 0,
  force = TRUE
)
ignore <- Map(
  theme_names,
  format(theme_names),
  f = function(name, name_fmt) {
    dir.create(file.path(out_dir, name), recursive = TRUE, showWarnings = FALSE)

    # == Find and replace the `web-font-url` variable =========================
    # Find the `web-font-url` variable in the `.scss` files
    # and replace it with the original CDN url from the npm package theme.
    # Make sure there are no url-like variables besides `web-font-url` in the
    # `.scss` files.

    # Find any line that has a url for a variable
    npm_theme_path <- file.path(bootswatch_npm_dist, name)
    npm_lines <- c(
      readLines(file.path(npm_theme_path, "_variables.scss")),
      readLines(file.path(npm_theme_path, "_bootswatch.scss"))
    )
    npm_url_lines <- npm_lines[grep("\"https?://", npm_lines)]
    variable_map <- list()
    # Make a map of all the variables and their values
    for (npm_url_line in npm_url_lines) {
      line_parts <- strsplit(npm_url_line, ": ")[[1]]
      variable <- sub("^\\$", "", line_parts[1])
      val <- sub(" !default;$", "", line_parts[2])
      variable_map[[variable]] <- val
    }

    # Diagnostics on which sass variables were found
    if (length(variable_map) == 0) {
      # Good
      p$tick(tokens = list(ver = ver, name = name_fmt, status = "X"))
    } else {
      has_web_font_path <- "web-font-path" %in% names(variable_map)
      if (!has_web_font_path) {
        # Not good. At least one variable besides `web-font-path` was found
        str(variable_map)
        stop(
          "`web-font-path` not found in `", name, "` Sass files.",
          " Found unexpected Sass variables:\n* ",
          paste0(names(variable_map), collapse = "\n* ")
        )
      }
      p$tick(tokens = list(ver = ver, name = name_fmt, status = "√"))
    }
    # == End - Find and replace the `web-font-url` variable ===================

    # Get the patched sass bundle from bslib
    sass_bundle <- bslib::bs_theme(version = ver, bootswatch = name)
    # Overwrite the variables back to the original CDN paths
    sass_bundle <- bs_add_variables(
      sass_bundle,
      # Spread the list of variables into the function
      !!!variable_map
    )

    # Write bundle to disk
    sass::sass(
      sass_bundle,
      # Make a minimized output file
      options = sass::sass_options_get(output_style = "compressed"),
      output = file.path(out_dir, name, "bootswatch.min.css"),
      cache = FALSE,
      # Should be `TRUE` if font files are to be saved.
      # However, we are not saving them as we are reverting the
      # local font paths to the original CDN paths in the code above.
      write_attachments = FALSE
    )
  }
)


# Save version info in python Black formatting
version_txt <- npm_tag
themes_txt <- jsonlite::toJSON(
  as.list(theme_names),
  auto_unbox = TRUE,
  pretty = TRUE
)
# Python's Black likes to format code with trailing commas and with 4 spaces
themes_txt <- sub("\"\n", "\",\n", themes_txt)
themes_txt <- sub("]\n", "],\n", themes_txt)
themes_txt <- gsub("  ", "    ", themes_txt)

themes_type_txt <- paste0("typing.Literal", themes_txt)
themes_tuple_txt <- themes_txt
themes_tuple_txt <- sub("]", ")", themes_tuple_txt, fixed = TRUE)
themes_tuple_txt <- sub("[", "(", themes_tuple_txt, fixed = TRUE)

bsw5_file_txt <- glue::glue(
  "
# Do not edit this file, please run `Rscript scripts/update_bootswatch.R`

import typing

bsw5_version = \"{version_txt}\"

bsw5_themes = {themes_tuple_txt}

BSW5_THEME_NAME = {themes_type_txt}

"
)

cat(file = file.path(lib, "_bsw5.py"), bsw5_file_txt)


theme_objects_txt <-
  paste0(
    theme_names, " = get_theme(\"", theme_names, "\")",
    collapse = "\n"
  )
all_inner_txt <- paste0(
  "    \"", theme_names, "\",\n",
  collapse = ""
)
themes_file_txt <- glue::glue(
  "
# Do not edit this file, please run `Rscript scripts/update_bootswatch.R`

from ._get_theme import get_theme

{theme_objects_txt}

__all__ = (
{all_inner_txt})

"
)
cat(file = file.path(lib, "theme.py"), themes_file_txt)




# Cleanup
unlink(file.path(root, "node_modules"), recursive = TRUE)
