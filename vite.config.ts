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
        id: "https://cookeep.kr/",
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
            src: "appIcon.png" /*파일 아직 없음 */,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "appIcon.png",
            sizes: "1024x1024",
            type: "image/png",
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
