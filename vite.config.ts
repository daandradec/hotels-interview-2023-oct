import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: '@src', replacement: path.resolve(__dirname, './src') },
        { find: '@@types', replacement: path.resolve(__dirname, './src/types') },
        { find: '@views', replacement: path.resolve(__dirname, './src/views') },
        { find: '@router', replacement: path.resolve(__dirname, './src/router') },
        { find: '@styles', replacement: path.resolve(__dirname, './src/styles') },
        { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
        { find: '@components', replacement: path.resolve(__dirname, './src/components') },
        { find: '@js', replacement: path.resolve(__dirname, './src/js') },
    ]
},   
})
