import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
      proxy: {
          '/api': {
              target: "https://bookbuddy-container-debug.icybay-b9183a86.germanywestcentral.azurecontainerapps.io",
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, ''),
              configure: (proxy, _options) => {
                  proxy.on('proxyReq', (proxyReq, req, _res) => {
                      // Usuwamy nagłówki identyfikacyjne całkowicie
                      proxyReq.removeHeader('origin');
                      proxyReq.removeHeader('referer');
                      // Ustawiamy hosta na docelowego
                      proxyReq.setHeader('host', 'bookbuddy-container-debug.icybay-b9183a86.germanywestcentral.azurecontainerapps.io');
                  });
              },
          },
      }
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    include: ["react-router"]
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
