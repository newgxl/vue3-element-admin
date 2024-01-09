// 产出2用户信息的仓库
import { defineStore } from "pinia"
import { store } from "../index"
// 类型定义
interface IUserState {
  userInfo?: any
  userToken: string
  userMenus: string[]
}
// 在 .vue 文件下用这个
export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    userInfo: {},
    userMenus: [],
    userToken: ""
  }),
  getters: {},
  actions: {},
  persist: true
})
// 在 .ts 文件下用这个
export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
