module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 360,
      viewportHeight: 998
    },
    'autoprefixer': {
      overrideBrowserslist: ['last 2 versions', '> 1%']
    },
  }
}
