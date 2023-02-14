const babelJestMd = require('babel-jest')
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd // TODO: fix after "jest" v28 release (https://github.com/facebook/jest/issues/11444)

module.exports = babelJest.createTransformer({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
})
