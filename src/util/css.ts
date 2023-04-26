export function updateVantCSSVar() {
  let cssVar = [
    ['--van-tabs-bottom-bar-color', '#FF7500'],
    ['--van-tabs-nav-background', 'transparent'],
    ['--van-field-label-width', '5.5em'],
  ]

  cssVar.forEach(item => {
    document.documentElement.style.setProperty(item[0], item[1])
  })
}