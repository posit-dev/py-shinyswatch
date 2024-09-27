/* globals Shiny,$ */
(function () {
  // Stores the default theme links, if not one of the shinyswatch themes
  // Is always an array, even if there is only one link
  /** @type {HTMLLinkElement[] | undefined | null} */
  let initialThemeLink
  /** @type {string} */
  let initialThemeName = 'default'

  /**
   * Gets the `<link>` elements of the initial theme.
   *
   * This only happens on page load. For `shiny.ui.Theme()`, we expect the theme element
   * to have a `data-shiny-theme` attribute, otherwise we expect the initial theme to
   * be a `<link>` element referring to `bootstrap.min.css`.
   * @returns {HTMLLinkElement[] | undefined}
   */
  function getInitialThemeLink () {
    if (typeof initialThemeLink !== 'undefined') {
      return initialThemeLink
    }

    const initShinyTheme = document.querySelectorAll('link[data-shiny-theme]')
    if (initShinyTheme.length > 0) {
      initialThemeLink = Array.from(initShinyTheme)
      const themeNames = initialThemeLink
        .map(el => el.dataset.shinyTheme)
        .filter(nm => nm && nm !== '')

      if (themeNames.length > 0) {
        initialThemeName = themeNames[0]
      }

      initialThemeLink.forEach(link => {
        link.dataset.shinyswatchTheme = initialThemeName
      })
      return initialThemeLink
    }

    const initBootstrapLink = document.querySelector('link[href$="bootstrap.min.css"]')
    if (initBootstrapLink) {
      initBootstrapLink.dataset.shinyswatchTheme = 'default'
      initialThemeLink = [initBootstrapLink]
      return initialThemeLink
    }

    initialThemeLink = null
  }

  /**
   * Gets the theme from local storage.
   * @returns {string | null}
   **/
  function getThemeLocalStorage () {
    return localStorage.getItem('shinyswatch-theme')
  }

  /**
   * Sets the theme in local storage.
   * @param {string} theme
   * @returns {void}
   **/
  function setThemeLocalStorage (theme) {
    localStorage.setItem('shinyswatch-theme', theme)
  }

  /**
   * Creates a new shinyswatch link element.
   *
   * Note that we don't use `Shiny.renderDependencies()` here because we want to be
   * fully in control of how the CSS `<link>` elements are added and removed.
   *
   * @param {string} theme The theme name.
   * @param {Object} dep The JSON-ified HTMLDependency object. We expect a single
   *   dependency with a single stylesheet and we only create a link from the first
   *   stylesheet. This assumption holds for `shiny.ui.Theme()` and for
   *   `shinyswatch.theme.*` themes. Because custom themes may not follow this
   *   expectation, they are only allowed as the initial theme, which uses a different
   *   code path.
   * @returns {HTMLLinkElement}
   */
  function makeShinyswatchLink (theme, dep) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    for (const [key, value] of Object.entries(dep.stylesheet[0])) {
      link.setAttribute(key, value)
    }

    link.dataset.shinyswatchTheme = theme

    return link
  }

  /**
   * Replaces the current shinyswatch CSS with a new theme.
   * @param {{ theme: string, dep: Object }} message The theme name and its optional
   *   dependency object.
   * @returns {HTMLLinkElement | HTMLLinkElement[]}
   */
  function replaceShinyswatchCSS ({ theme, dep }) {
    const oldLinks = document.querySelectorAll(
      'link[data-shinyswatch-theme]'
    )

    // If we have more than one link, all but the last are already scheduled for
    // removal. The current update will only copy and remove the last one.
    const oldLink = oldLinks.length > 0 ? oldLinks[oldLinks.length - 1] : null

    if (oldLink && oldLink.dataset.shinyswatchTheme === theme) {
      // The theme is already applied, so we don't need to do anything.
      return
    }

    const removeLinks = oldLink && oldLink.dataset.shinyswatchTheme === initialThemeName
      ? 'initial'
      : 'old'

    const cleanup = () => {
      shinyswatchTransition(false)
      switch (removeLinks) {
        case 'old':
          oldLink.remove()
          break
        case 'initial':
          document
            .querySelectorAll(`[data-shinyswatch-theme="${initialThemeName}"]`)
            .forEach(link => link.remove())
          break
      }
    }

    const backup = setTimeout(cleanup, 500)

    // Theme picker adds a `* { transition: ... }` rule that we can use to detect
    // when the new theme has been applied.
    document.body.addEventListener(
      'transitionend',
      () => {
        clearTimeout(backup)
        cleanup()
      },
      { once: true }
    )

    setThemeLocalStorage(theme)

    if (theme === initialThemeName && getInitialThemeLink()) {
      const newLinks = getInitialThemeLink().map(link => link.cloneNode())
      newLinks[0].onload = () => shinyswatchTransition(true)
      newLinks.forEach(nl => oldLink.parentNode.insertBefore(nl, oldLink.nextSibling))
      return newLinks
    } else {
      const newLink = makeShinyswatchLink(theme, dep)
      newLink.onload = () => shinyswatchTransition(true)
      oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling)
      return newLink
    }
  }

  /**
   * Sets a top-level attribute to indicate that a shinyswatch-induced transition is in
   * progress.
   *
   * The `data-shinyswatch-transitioning` attribute activates a CSS transition in the
   * theme-picker CSS styles that is used to smooth the theme change. We also listen for
   * the transition end event as the signal that we should remove the replaced
   * stylesheets.
   *
   * @param {boolean} transitioning
   */
  function shinyswatchTransition (transitioning) {
    if (transitioning) {
      document.documentElement.dataset.shinyswatchTransitioning = 'true'
    } else {
      setTimeout(
        () => {
          // Give the transition a tick to end before removing the attribute
          document.documentElement.removeAttribute('data-shinyswatch-transitioning')
        },
        100
      )
    }
  }

  /**
   * Reports the initial theme to Shiny.
   *
   * Because the initial theme is not set by the theme picker, we need to report it
   * back to the server. The theme may also be a user-provided custom theme, in which
   * case it is added to the theme choices.
   *
   * When detecting the initial theme, if the initial theme is not from shinyswatch, we
   * keep a reference to its link element(s) to use when returning to the theme.
   */
  function shinyswatchReportInitialTheme () {
    if (!window.Shiny) {
      return
    }
    if (typeof window.Shiny.setInputValue !== 'function') {
      setTimeout(shinyswatchReportInitialTheme, 1)
      return
    }

    const initLink = getInitialThemeLink()
    const initTheme = {
      name: initLink ? initialThemeName : '',
      saved: getThemeLocalStorage() || '',
    }

    window.Shiny.setInputValue('__shinyswatch_initial_theme', initTheme)
  }

  function removeWarning() {
    const warning = document.getElementById("shinyswatch_picker_warning")
    if (warning) {
      warning.remove()
    }
  }

  function showWarning() {
    const warning = document.getElementById('shinyswatch_picker_warning')
    if (warning) {
      warning.style.display = null
    }
  }

  if (typeof window.Shiny.setInputValue === "function") {
    setTimeout(showWarning, 1000)
  } else {
    $(window).one("shiny:idle", showWarning)
  }

  Shiny.addCustomMessageHandler('shinyswatch-hide-warning', function (_) {
    removeWarning()
  })

  Shiny.addCustomMessageHandler('shinyswatch-pick-theme', replaceShinyswatchCSS)

  shinyswatchReportInitialTheme()
})()
