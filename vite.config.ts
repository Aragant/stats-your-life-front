import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // ✅ alias @ -> src
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3000,
        https: {
            key: fs.readFileSync("./certs/app.local.stats-key.pem"),
            cert: fs.readFileSync("./certs/app.local.stats.pem"),
        },
    },
});
