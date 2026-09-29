import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { cases } from "./src/content/cases";
import { site } from "./src/content/site";

// sitemap.xml собирается из списка кейсов при каждой сборке.
function sitemap(): Plugin {
  return {
    name: "sitemap",
    apply: "build",
    generateBundle() {
      const paths = ["/", "/cases", ...cases.map((item) => `/cases/${item.slug}`)];
      const urls = paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), sitemap(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
