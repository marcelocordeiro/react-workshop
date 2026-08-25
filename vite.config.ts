import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite is the dev server + bundler. Tests are configured separately in
// jest.config.cjs, the same way your backend build tool and test runner
// are configured in different blocks.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
});
