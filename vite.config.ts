import { fileURLToPath, URL } from "node:url"
const path = require("path")
import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueJsx from "@vitejs/plugin-vue-jsx" // 让vue3支持tsx语法
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import Inspect from "vite-plugin-inspect"
import { visualizer } from "rollup-plugin-visualizer"
// 按需导入element plus
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import VueI18n from "@intlify/unplugin-vue-i18n/vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // emptyOutDir: true,
  plugins: [
    vue(),
    VueJsx(),
    Inspect(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
        filepath: "./.eslintrc-auto-import.json" // 指定自动导入函数 eslint 规则的文件
        // "vue/multi-word-component-names":"off",
      },
      dts: path.resolve("./src", "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    VueI18n({
      include: [resolve(__dirname, "src/locales/**")]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@img": fileURLToPath(new URL("./src/assets/images", import.meta.url))
    }
  },
  server: {
    cors: true, // 允许跨域
    hmr: true
    // open: true // 在服务器启动时自动在浏览器中打开应用程序
    // proxy: {
    //   "/api": {
    //     target: "http://10.143.4.103:8083/",
    //     changeOrigin: true, //是否跨域
    //     rewrite: (path) => path.replace("/api", "")
    //   }
    // }
  },
  build: {
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      plugins: [
        visualizer({
          open: true, //注意这里要设置为true，否则无效
          filename: "stats.html", //分析图生成的文件名
          gzipSize: true, // 收集 gzip 大小并将其显示
          brotliSize: true // 收集 brotli 大小并将其显示
        })
      ]
    }
  }
})
