import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD

export default defineConfig({
  plugins: [react()],
  base: "/Resume_uilder/",  // 👈 repo name here
=======
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
>>>>>>> d876bbe4e477a9b14685c19819f090b923c54511
})
