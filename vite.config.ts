import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'import.meta.env.AUTH0_DOMAIN': JSON.stringify(env.AUTH0_DOMAIN),
      'import.meta.env.AUTH0_CLIENT_ID': JSON.stringify(env.AUTH0_CLIENT_ID),
      'import.meta.env.AUTH0_AUDIENCE': JSON.stringify(env.AUTH0_AUDIENCE),
    },
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
      },
    },
  }
})
