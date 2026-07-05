import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "prompt", // registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "appIcon.png", "appIcon.svg"],
      manifest: {
        id: "https://cookeep.kr/",
        name: "CooKeep",
        short_name: "CooKeep",
        description: "재료 관리부터, 요리 기록까지! CooKeep",
        lang: "ko-KR",
        dir: "ltr",
        theme_color: "#FAFAFA",
        background_color: "#FAFAFA",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        launch_handler: {
          client_mode: "focus-existing",
        },
        prefer_related_applications: true,
        related_applications: [
          {
            platform: "play",
            url: "https://play.google.com/store/apps/details?id=kr.cookeep.app",
            id: "kr.cookeep.twa",
          },
        ],
        scope_extensions: [
          { origin: "*.cookeep.kr" },
          { origin: "accounts.google.com" },
          { origin: "kauth.kakao.com" },
        ],
        categories: ["food", "lifestyle", "utilities"],
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "appIcon.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/assets/screenshots/screenshot1.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "쿠킵 표지",
          },
          {
            src: "/assets/screenshots/screenshot2.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "쿠킵 메인 화면",
          },
          {
            src: "/assets/screenshots/screenshot3.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "쿠킵 레시피탭",
          },
          {
            src: "/assets/screenshots/screenshot4.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "쿠킵 마이 페이지",
          },
          {
            src: "/assets/screenshots/screenshot5.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
            label: "쿠킵스 커뮤니티 페이지",
          },
        ],
      },

      injectManifest: {
        swDest: "dist/sw.js",
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        globPatterns: ["**/*.{js,css,html}"],
        maximumFileSizeToCacheInBytes: 1024 * 1024,
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "default",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
});
