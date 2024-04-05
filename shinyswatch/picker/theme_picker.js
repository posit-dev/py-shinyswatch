// Get the source path of the shinyswatch-js script
// to figure out where the htmldependency has ended up
// e.g. src="lib/shinyswatch-js-5.3.1/bootstrap.bundle.min.js"
// avoids having to know the shinswatch bootstrap version or lib location
const sw_script = document.querySelector('script[src*="shinyswatch-js"')
const subdir = sw_script.src
  .replace(/\/bootstrap.*js$/, '')
  .replace('shinyswatch-js', 'shinyswatch-css-all')

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

Shiny.addCustomMessageHandler('shinyswatch-pick-theme', function (theme) {
  const base_dir = `${subdir}/${theme}`

  const sheets = ['bootswatch.min.css', 'shinyswatch-ionRangeSlider.css']

  for (const sheet of sheets) {
    const oldLink = document.querySelector(
      `link[data-shinyswatch-css="${sheet}"]`
    )

    if (oldLink) {
      if (oldLink.dataset.shinyswatchTheme !== theme) {
        const newLink = oldLink.cloneNode(true)
        newLink.href = newLink.href.replace(
          oldLink.dataset.shinyswatchTheme,
          theme
        )
        newLink.href = newLink.href.replace(window.location.href, '')
        newLink.dataset.shinyswatchTheme = theme
        oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling)
        const backup = setTimeout(() => {
          // If the transitionend event doesn't fire, remove the old link after 500ms
          if (oldLink.parentNode) oldLink.remove()
        }, 500)

        // Theme picker adds a `* { transition: ... }` rule that we can use to detect
        // when the new theme has been applied.
        document.body.addEventListener(
          'transitionend',
          () => {
            clearTimeout(backup)
            oldLink.remove()
          },
          { once: true }
        )
      }
      continue
    }

    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `${base_dir}/${sheet}`
    link.dataset.shinyswatchCSS = sheet
    link.dataset.shinyswatchTheme = theme
    document.body.appendChild(link)
  }
})
