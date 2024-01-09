/**
 * 注册一些全局的库
 */
import type { App } from "vue"
// 导入动画库
import "@/plugins/animate/animate.ts"
// 导入全局的css
import "@/assets/css/index.scss"
// 导入element plus
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

export const setupGlobal = (app: App<Element>) => {
  app.use(ElementPlus)
}
