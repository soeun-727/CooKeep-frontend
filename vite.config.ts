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
            id: "kr.cookeep.app",
          },
        ],
        scope_extensions: [
          { origin: "*.cookeep.kr" },
          { origin: "accounts.google.com" },
          { origin: "kauth.kakao.com" },
        ],
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
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
