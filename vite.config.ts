import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "appIcon.png", "appIcon.svg"],
      manifest: {
        name: "CooKeep",
        short_name: "CooKeep",
        description: "재료 관리부터, 요리 기록까지! CooKeep",
        theme_color: "#FAFAFA",
        background_color: "#FAFAFA",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "appIcon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "appIcon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "appIcon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      injectManifest: {
        swDest: "dist/sw.js",
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
