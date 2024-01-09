import { defineStore } from "pinia"
import { store } from "../index"

// 在 .vue 文件用这个
export const useAppStore = defineStore("app", {
  state: (): any => {
    return {
      breadcrumb: true // 是否显示面包屑
    }
  },
  // 获取state的值
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    }
  },
  //修改state的值
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    }
  },
  persist: true
})
// 在 .ts 文件用这个
export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
