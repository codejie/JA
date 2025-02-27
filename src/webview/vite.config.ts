import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('vscode-'),
        },
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**',
          dest: 'assets'
        }
      ]
    })
  ],
  build: {
    outDir: '../../dist/webview',
    emptyOutDir: true,
    assetsDir: 'assets',
    lib: {
      entry: 'src/main.ts',
      name: 'webview',
      fileName: 'webview',
      formats: ['es']
    }
  },
  define: {
    'process.env': {}
  }
})
