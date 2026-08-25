import { rest } from 'msw';

export const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const mockUsers = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com' },
];

/**
 * Default handlers: the "happy path" every test starts from.
 *
 * MSW intercepts requests at the network layer, so the component under test
 * uses the real axios and the real React Query cache — only the server is
 * fake. Compare that with `jest.mock('axios')`, which replaces the HTTP
 * client itself. This is the difference between running against a stub
 * server and injecting a mocked repository.
 */
export const handlers = [
  rest.get(API_URL, (_req, res, ctx) => res(ctx.json(mockUsers))),

  rest.post(API_URL, async (req, res, ctx) => {
    const body = await req.json<{ name: string; email: string }>();
    return res(ctx.status(201), ctx.json({ id: 11, ...body }));
  }),
];
