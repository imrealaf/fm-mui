const config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/components/*', 'src/hooks/*'],
  coveragePathIgnorePatterns: ['src/components/index.ts', 'src/hooks/index.ts'],
  modulePathIgnorePatterns: ['dist'],
  resetMocks: true,
  testEnvironment: 'jsdom'
}

module.exports = config
