import { createApp } from "vue"
import { setupI18n } from "@/plugins/vueI18n"
import { setupStore } from "@/store"
import { setupRouter } from "@/router"
import { setupGlobal } from "@/hooks/web/useGlobal"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue"
async function setupAll() {
  const app = createApp(App)
  await setupI18n(app)
  // 初始化全局导入
  setupGlobal(app)
  // 初始化仓库
  setupStore(app)
  // 初始化路由
  setupRouter(app)
  // 挂载
  app.mount("#app")
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
setupAll()
