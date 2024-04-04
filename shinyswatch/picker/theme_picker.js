// Get the source path of the current script
// to figure out where the htmldependency has ended up
const scripts = document.getElementsByTagName('script');
const currentScriptSrc = scripts[scripts.length - 1].src;
const hostWithSubdir = currentScriptSrc.replace(/\/shinyswatch-theme-picker.+/, '');
const subdir = hostWithSubdir.replace(window.href, '');

const display_warning = setTimeout(function() {
  window.document.querySelector("#shinyswatch_picker_warning").style.display = 'block';
}, 1000);

Shiny.addCustomMessageHandler('shinyswatch-hide-warning', function(message) {
  window.clearTimeout(display_warning);
});

Shiny.addCustomMessageHandler('shinyswatch-refresh', function(message) {
  window.location.reload();
});

Shiny.addCustomMessageHandler('shinyswatch-pick-theme', function({ theme, version }) {
  const base_dir = `${subdir}/shinyswatch-all-css-${version}/${theme}`;

  const sheets = ["bootswatch.min.css", "shinyswatch-ionRangeSlider.css"];

  for (const sheet of sheets) {
    let oldLink = document.querySelector(`link[data-shinyswatch="${sheet}"]`);
    if (oldLink) {
      oldLink.href = `${base_dir}/${sheet}`;
    } else {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `${base_dir}/${sheet}`;
      link.dataset.shinyswatch = sheet;
      document.body.appendChild(link);
    }
  }
})
