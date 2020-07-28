module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/pipeable.ts',
    '!src/EitherT.ts',
    '!src/ReaderT.ts',
    '!src/StateT.ts',
    '!src/TheseT.ts',
    '!src/WriterT.ts',
    '!src/ValidationT.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'test',
  moduleFileExtensions: ['ts', 'js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  modulePathIgnorePatterns: ['util', 'smoke-tests']
}
