/**
 * Jest configuration.
 *
 * Backend analogy: this file is the frontend equivalent of the Surefire/Gradle
 * test block in your build file — it tells the runner which files are tests,
 * how to compile them, and what to bootstrap before they run.
 *
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  // jsdom gives us a fake browser (document, window, DOM APIs) inside Node.
  // Without it, `render(<Counter />)` would have nowhere to render to.
  testEnvironment: 'jest-environment-jsdom',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // ts-jest compiles TypeScript/TSX on the fly, using a tsconfig tuned for
  // CommonJS (Jest runs on CommonJS, while the Vite build uses ES modules).
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.jest.json' },
    ],
  },

  // Jest cannot parse CSS or binary assets. These mappers replace them with
  // harmless stubs so an `import './styles.css'` never breaks a test.
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/src/test/fileMock.cjs',
  },

  // Runs after the test framework is installed, before each test file.
  // This is where jest-dom matchers and the MSW server lifecycle are wired up.
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],

  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx)'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/main.tsx',
    '!src/test/**',
  ],
  coverageReporters: ['text', 'html'],
  coverageDirectory: 'coverage',
};
