(function () {
  // Stores the default link, if not one of the shinyswatch themes
  let initialThemeLink

  // Get the source path of the shinyswatch-js script
  // to figure out where the htmldependency has ended up
  // e.g. href="lib/shinyswatch-css-superhero-5.3.1/bootswatch.min.css"
  // avoids having to know the shinswatch bootstrap version or lib location
  function getShinyswatchLibPath() {
    const sw_link = document.querySelector('link[href*="shinyswatch-theme-picker"')
    return sw_link.href
      .replace(/\/theme_picker.css$/, '')
      .replace('shinyswatch-theme-picker', 'shinyswatch-css-all')
  }

  function getInitialThemeLink() {
    if (initialThemeLink) {
      return initialThemeLink
    }

    const initBootstrapLink = document.querySelector('link[href$="bootstrap.min.css"]')
    if (initBootstrapLink) {
      initialThemeLink = initBootstrapLink
      initialThemeLink.dataset.shinyswatchTheme = "default"
      return initialThemeLink
    }

    const initShinyswatch = document
      .querySelector('link[href$="bootswatch.min.css"]:not([data-shinyswatch-theme])')

    if (!initShinyswatch) {
      return
    }

    initShinyswatch.dataset.shinyswatchTheme = initShinyswatch.href
      .match(/shinyswatch-css-(\w+)(-[\d.]+)?/)[1]

    return initShinyswatch
  }

  function replaceShinyswatchCSS({ theme }) {
    const sheet = 'bootswatch.min.css'

    const oldLinks = document.querySelectorAll(
      `link[data-shinyswatch-theme]`
    )

    if (oldLinks.length == 0) {
      // For some reason we don't have a shinyswatch-created theme link, so we'll have
      // to create one ourselves.
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = `${getShinyswatchLibPath()}/${theme}/${sheet}`
      link.dataset.shinyswatchTheme = theme
      link.onload = () => shinyswatchTransition(true)
      document.body.appendChild(link)
      document.body.addEventListener(
        'transitionend',
        () => {
          shinyswatchTransition(false)
          // Remove the initial bootswatch theme if it exists
          const initLink = getInitialThemeLink()
          if (initLink) {
            initLink.remove()
          }
        },
        { once: true }
      )
      return link
    }

    // If we have more than one link, all but the last are already scheduled for
    // removal. The current update will only copy and remove the last one.
    const oldLink = oldLinks[oldLinks.length - 1]

    if (oldLink.dataset.shinyswatchTheme === theme) {
      // The theme is already applied, so we don't need to do anything.
      return;
    }

    let newLink
    if (theme === 'default') {
      newLink = getInitialThemeLink().cloneNode(true)
    } else {
      newLink = oldLink.cloneNode(true)
      newLink.href = `${getShinyswatchLibPath()}/${theme}/${sheet}`
      newLink.dataset.shinyswatchTheme = theme
    }

    const cleanup = () => {
      shinyswatchTransition(false)
      oldLink.remove()
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

    newLink.onload = () => shinyswatchTransition(true)
    oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling)
    return newLink
  }

  function shinyswatchTransition(transitioning) {
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

  function shinyswatchReportInitialTheme() {
    if (!window.Shiny) {
      return
    }
    if (typeof window.Shiny.setInputValue !== "function") {
      setTimeout(shinyswatchReportInitialTheme, 1)
      return
    }

    const initLink = getInitialThemeLink()
    if (!initLink) {
      window.Shiny.setInputValue("__shinyswatch_initial_theme", "")
      return
    }

    const theme = initLink.dataset.shinyswatchTheme || ""
    window.Shiny.setInputValue("__shinyswatch_initial_theme", theme)
  }

  const display_warning = setTimeout(function () {
    window.document.querySelector('#shinyswatch_picker_warning').style.display =
      'block'
  }, 1000)

  Shiny.addCustomMessageHandler('shinyswatch-hide-warning', function (message) {
    window.clearTimeout(display_warning)
  })

  Shiny.addCustomMessageHandler('shinyswatch-pick-theme', replaceShinyswatchCSS)

  shinyswatchReportInitialTheme()
})()
