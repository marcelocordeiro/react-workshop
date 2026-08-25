// Runs once per test file, before the tests in it.

// Adds DOM-aware matchers: toBeInTheDocument, toBeChecked, toHaveFocus, ...
import '@testing-library/jest-dom';

import { server } from './mocks/server';

// `onUnhandledRequest: 'error'` fails the test if the code under test calls an
// endpoint nobody declared a handler for. That is deliberate: an accidental
// real network call in a unit test is a bug, not a warning.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Throw away per-test handler overrides so tests stay independent.
afterEach(() => server.resetHandlers());

afterAll(() => server.close());
