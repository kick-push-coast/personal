import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/components/BoardContainer/BoardContainer.tsx'),
            name: 'BoardContainer',
            fileName: (format) => `BoardContainer.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React'
                }
            }
        }
    },
    plugins: [
        cssInjectedByJsPlugin(),
        dts({
            insertTypesEntry: true,
        }),
        react()
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/tests/setup.js',
    }
})