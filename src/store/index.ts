import type { App } from "vue"
import { createPinia } from "pinia"
// pinia 持久话插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

// 创建一个 store
const store = createPinia()

// 注册持久化插件
store.use(piniaPluginPersistedstate)

// 初始化仓库
export const setupStore = (app: App<Element>) => {
  app.use(store)
}
// 将 store 导出给 modules
export { store }
