import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem')),
    },
    proxy: {
      "/api": {
        target: "https://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "https://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  envDir: "./env",
});
