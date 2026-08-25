import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// One fake server shared by the whole test run. Its lifecycle is wired up in
// src/test/setup.ts, so individual test files only override handlers when
// they need a specific response (an error, an empty list, a slow request).
export const server = setupServer(...handlers);
