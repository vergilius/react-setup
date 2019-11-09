module.exports = {
  displayName: 'test',
  cacheDirectory: '/tmp/jest_cache',
  setupFiles: ['<rootDir>/scripts/testsSetup.js'],
  roots: ['<rootDir>/src/', '<rootDir>/scripts/'],
  transform: {
    '.*': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy'
  },
  moduleDirectories: ['<rootDir>/src/', 'node_modules'],
  modulePathIgnorePatterns: ['dist'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
