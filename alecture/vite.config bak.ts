import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import url from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@typings', replacement: path.resolve(__dirname, 'src/typings') },
    ],
  },
});
