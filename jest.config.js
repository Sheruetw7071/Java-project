module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/backend/data/'],
  collectCoverageFrom: [
    'js/**/*.js',
    'backend/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  moduleFileExtensions: ['js', 'json'],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ]
};