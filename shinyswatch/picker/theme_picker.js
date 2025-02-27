/* globals Shiny,$,HTMLElement */
class ShinyswatchThemePicker extends HTMLElement {
  static hasServerCall = false

  constructor () {
    super()
    this.initialThemeLink = undefined
    this.initialThemeName = 'default'
    this.setupShinyHandlers()
  }

  connectedCallback () {
    this.ensureUniqueInstance()
    this.shinyswatchReportInitialTheme()
    this.showWarningAfterDelay()
  }

  ensureUniqueInstance() {
    const existingPickers = document.querySelectorAll('[id="shinyswatch_theme_picker"]');
    if (existingPickers.length > 1) {
      const message = 'Multiple `shinyswatch.theme_picker_ui()` elements detected. Only one instance per app is supported.'
      const shinyClientError = new window.CustomEvent('shiny:client-message', {
        detail: {
          headline: 'Only one theme picker allowed',
          message,
        },
        bubbles: true,
        cancelable: true
      })
      this.dispatchEvent(shinyClientError)
      console.error(`[shinyswatch] ${message}`)
    }
  }

  /**
   * Gets the `<link>` elements of the initial theme.
   *
   * This only happens on page load. For `shiny.ui.Theme()`, we expect the theme element
   * to have a `data-shiny-theme` attribute, otherwise we expect the initial theme to
   * be a `<link>` element referring to `bootstrap.min.css`.
   * @returns {HTMLLinkElement[] | undefined}
   */
  getInitialThemeLink () {
    if (typeof this.initialThemeLink !== 'undefined') {
      return this.initialThemeLink
    }

    const initShinyTheme = document.querySelectorAll('link[data-shiny-theme]')
    if (initShinyTheme.length > 0) {
      this.initialThemeLink = Array.from(initShinyTheme)
      const themeNames = this.initialThemeLink
        .map((el) => el.dataset.shinyTheme)
        .filter((nm) => nm && nm !== '')

      if (themeNames.length > 0) {
        this.initialThemeName = themeNames[0]
      }

      this.initialThemeLink.forEach((link) => {
        link.dataset.shinyswatchTheme = this.initialThemeName
      })
      return this.initialThemeLink
    }

    const initBootstrapLink = document.querySelector(
      'link[href$="bootstrap.min.css"]'
    )
    if (initBootstrapLink) {
      initBootstrapLink.dataset.shinyswatchTheme = 'default'
      this.initialThemeLink = [initBootstrapLink]
      return this.initialThemeLink
    }

    this.initialThemeLink = null
  }

  /**
   * Gets the theme from local storage.
   * @returns {string | null}
   **/
  getThemeLocalStorage () {
    return window.localStorage.getItem('shinyswatch-theme')
  }

  /**
   * Sets the theme in local storage.
   * @param {string} theme
   * @returns {void}
   **/
  setThemeLocalStorage (theme) {
    window.localStorage.setItem('shinyswatch-theme', theme)
  }

  makeShinyswatchLink (theme, dep) {
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
  replaceShinyswatchCSS ({ theme, dep }) {
    const oldLinks = document.querySelectorAll('link[data-shinyswatch-theme]')
    // If we have more than one link, all but the last are already scheduled for
    // removal. The current update will only copy and remove the last one.
    const oldLink = oldLinks.length > 0 ? oldLinks[oldLinks.length - 1] : null

    if (oldLink && oldLink.dataset.shinyswatchTheme === theme) {
      // The theme is already applied, so we don't need to do anything.
      return
    }

    const removeLinks =
      oldLink && oldLink.dataset.shinyswatchTheme === this.initialThemeName
        ? 'initial'
        : 'old'

    const cleanup = () => {
      this.shinyswatchTransition(false)
      switch (removeLinks) {
        case 'old':
          oldLink.remove()
          break
        case 'initial':
          document
            .querySelectorAll(
              `[data-shinyswatch-theme="${this.initialThemeName}"]`
            )
            .forEach((link) => link.remove())
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

    this.setThemeLocalStorage(theme)

    if (theme === this.initialThemeName && this.getInitialThemeLink()) {
      const newLinks = this.getInitialThemeLink().map((link) =>
        link.cloneNode()
      )
      newLinks[0].onload = () => this.shinyswatchTransition(true)
      newLinks.forEach((nl) =>
        oldLink.parentNode.insertBefore(nl, oldLink.nextSibling)
      )
      return newLinks
    } else {
      const newLink = this.makeShinyswatchLink(theme, dep)
      newLink.onload = () => this.shinyswatchTransition(true)
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
  shinyswatchTransition (transitioning) {
    if (transitioning) {
      document.documentElement.dataset.shinyswatchTransitioning = 'true'
    } else {
      setTimeout(() => {
        document.documentElement.removeAttribute(
          'data-shinyswatch-transitioning'
        )
      }, 100)
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
  shinyswatchReportInitialTheme () {
    if (!window.Shiny) {
      return
    }
    if (typeof window.Shiny.setInputValue !== 'function') {
      setTimeout(() => this.shinyswatchReportInitialTheme(), 1)
      return
    }

    const initLink = this.getInitialThemeLink()
    const initTheme = {
      name: initLink ? this.initialThemeName : '',
      saved: this.getThemeLocalStorage() || ''
    }

    window.Shiny.setInputValue('__shinyswatch_initial_theme', initTheme, {
      priority: 'event'
    })
  }

  removeWarning () {
    const warning = document.getElementById('shinyswatch_picker_warning')
    if (warning) {
      warning.remove()
    }
  }

  showWarning () {
    if (ShinyswatchThemePicker.hasServerCall) return

    const warning = document.getElementById('shinyswatch_picker_warning')
    if (warning) {
      warning.style.display = null
    }
  }

  setupShinyHandlers () {
    Shiny.addCustomMessageHandler('shinyswatch-hide-warning', (_) => {
      ShinyswatchThemePicker.hasServerCall = true
      this.removeWarning()
    })

    Shiny.addCustomMessageHandler('shinyswatch-pick-theme', (message) =>
      this.replaceShinyswatchCSS(message)
    )
  }

  showWarningAfterDelay () {
    if (typeof window.Shiny.setInputValue === 'function') {
      setTimeout(() => this.showWarning(), 1000)
    } else {
      $(window).one('shiny:idle', () => this.showWarning())
    }
  }
}

window.customElements.define('shinyswatch-theme-picker', ShinyswatchThemePicker)
