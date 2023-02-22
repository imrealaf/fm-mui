module.exports = function override(config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      fallback: { path: require.resolve('path-browserify') }
    }
  }
}
