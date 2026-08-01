import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Shuffle",
        short_name: "Shuffle",
        description: "A simple productivity app",
        start_url: "/",
        display: "standalone",
        background_color: "#cfefff",
        theme_color: "#174a7a",
        icons: [
          {
            src: "/ShuffleIcon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});