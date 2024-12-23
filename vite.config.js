import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.1.50", // Cho phép truy cập từ tất cả các IP
    port: 5173, // Cổng bạn muốn sử dụng
  },
});
