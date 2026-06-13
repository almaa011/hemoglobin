import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import webfontDownload from 'vite-plugin-webfont-dl'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: 'src',
  plugins: [
    webfontDownload(),
    viteSingleFile(),
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        'beer-lambert-explainer': resolve(__dirname, 'src/pages/beer-lambert-explainer.html'),
        'ppg-hemoglobin-explainer': resolve(__dirname, 'src/pages/ppg-hemoglobin-explainer.html'),
      },
    },
  },
})
