import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),

        storeHome: resolve(__dirname, "src/pages/store/home/home.html"),
        
        storeCart: resolve(__dirname, "src/pages/store/cart/cart.html"),

        productDetail: resolve(__dirname,"src/pages/store/productDetail/productDetail.html"),

        orders: resolve(__dirname,"src/pages/client/orders/orders.html"),

        login: resolve(__dirname, "src/pages/auth/login/login.html"),

        registro: resolve(__dirname, "src/pages/auth/registro/registro.html"),
        
        adminDashboard: resolve(__dirname,"src/pages/admin/dashboard/dashboard.html"),

        adminOrders: resolve(__dirname,"src/pages/admin/orders/orders.html"),

        admin: resolve(__dirname, "src/pages/store/home/home.html"),
      },
    },
  },
  base: "./",
});