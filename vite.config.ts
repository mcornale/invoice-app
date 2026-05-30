import { reactRouter } from '@react-router/dev/vite';
import netlifyReactRouter from '@netlify/vite-plugin-react-router';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter(), netlifyReactRouter()],
  resolve: {
    alias: {
      '~': '/app',
    },
  },
});
