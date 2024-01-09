/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent
  interface ComponentCustomProperties {
    $t: any
  }
  export default component
}
declare module "element-plus/dist/locale/zh-cn.mjs"
// declare module "nprogress"

// declare module "vue" {
//   interface ComponentCustomProperties {
//     $t: any
//   }
// }
