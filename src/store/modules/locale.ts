import { defineStore } from "pinia"
import { store } from "../index"
// element plus 的语言
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"
import { useStorage } from "@/hooks/web/useStorage"
import type { LocaleDropdownType } from "@/components/LocaleDropdown"

const { getStorage, setStorage } = useStorage()

const elLocaleMap = {
  "zh-CN": zhCn,
  en: en
}
interface LocaleState {
  currentLocale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}

export const useLocaleStore = defineStore("locales", {
  state: (): LocaleState => {
    return {
      // 当前的语言
      currentLocale: {
        lang: getStorage("lang") || "zh-CN",
        elLocale: elLocaleMap[getStorage("lang") || "zh-CN"]
      },
      // 多语言
      localeMap: [
        {
          lang: "zh-CN",
          name: "简体中文"
        },
        {
          lang: "en",
          name: "English"
        }
      ]
    }
  },
  getters: {
    // 获取当前设置的语言
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale
    },
    // 获取对应语言的 map
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap
    }
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
      setStorage("lang", localeMap?.lang)
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
