// Get the source path of the shinyswatch-js script
// to figure out where the htmldependency has ended up
// e.g. src="lib/shinyswatch-js-5.3.1/bootstrap.bundle.min.js"
// avoids having to know the shinswatch bootstrap version or lib location
function getShinyswatchLibPath () {
  const sw_script = document.querySelector('script[src*="shinyswatch-js"')
  return sw_script.src
    .replace(/\/bootstrap.*js$/, '')
    .replace('shinyswatch-js', 'shinyswatch-all-css')
}

const display_warning = setTimeout(function () {
  window.document.querySelector('#shinyswatch_picker_warning').style.display =
    'block'
}, 1000)

Shiny.addCustomMessageHandler('shinyswatch-hide-warning', function (message) {
  window.clearTimeout(display_warning)
})

Shiny.addCustomMessageHandler('shinyswatch-refresh', function (message) {
  window.location.reload()
})

Shiny.addCustomMessageHandler(
  'shinyswatch-pick-theme',
  function ({ theme, sheets }) {
    sheets.forEach(sheet => replaceShinyswatchCSS({ theme, sheet }))
  }
)

function replaceShinyswatchCSS ({ theme, sheet }) {
  const oldLinks = document.querySelectorAll(
    `link[data-shinyswatch-css="${sheet}"]`
  )

  if (oldLinks.length == 0) {
    // For some reason we don't have a shinyswatch-created theme link, so we'll have
    // to create one ourselves.
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `${getShinyswatchLibPath()}/${theme}/${sheet}`
    link.dataset.shinyswatchCss = sheet
    link.dataset.shinyswatchTheme = theme
    document.body.appendChild(link)
    return link
  }

  // If we have more than one link, all but the last are already scheduled for
  // removal. The current update will only copy and remove the last one.
  const oldLink = oldLinks[oldLinks.length - 1]

  if (oldLink.dataset.shinyswatchTheme === theme) {
    // The theme is already applied, so we don't need to do anything.
    return;
  }

  // Adding the new theme will trigger a transition, enable *smooth* transitions
  document.documentElement.dataset.shinyswatchTransitioning = 'true'

  const newLink = oldLink.cloneNode(true)
  newLink.href = newLink.href.replace(oldLink.dataset.shinyswatchTheme, theme)
  newLink.href = newLink.href.replace(window.location.href, '')
  newLink.dataset.shinyswatchTheme = theme
  oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling)

  const cleanup = () => {
    document.documentElement.removeAttribute('data-shinyswatch-transitioning')
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

  return newLink
}
