import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import swc from 'vite-plugin-swc-transform';
import tailwindcss from '@tailwindcss/vite'
const target = 'https://shjd-inner-boss.bilibili.co';
// const target = 'http://uat-ai-fe.bilibili.co';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [
    swc({
      swcOptions: {
        jsc: {
          target: 'es2022',
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            useDefineForClassFields: false,
            react: {
              runtime: 'automatic',
              importSource: 'vue-jsx-runtime',
            },
          },
          externalHelpers: true,
        },
      },
    }),
    tailwindcss(),
    vue(),
    vueJsx(),
    eslint({
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js')
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8085,
    allowedHosts:['local.bilibili.co'],
    proxy: {
      '/ai_efficiency': {
        target,
        changeOrigin: true,
        bypass(req) {
          req.headers.Referer = target;
          req.headers.Origin = target;
        },
      },
    },
  },
});
