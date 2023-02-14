// Transforming static assets to their path
// https://jestjs.io/docs/code-transformation#transforming-images-to-their-path

const path = require('path')

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`
  }
}
