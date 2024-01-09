import type { App } from "vue"
import { createI18n } from "vue-i18n"
import type { I18nOptions } from "vue-i18n"
import { useLocaleStoreWithOut } from "@/store/modules/locale"

export let i18n: ReturnType<typeof createI18n>

export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector("html")?.setAttribute("lang", locale)
}

const createI18nOptions = async (): Promise<I18nOptions> => {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getCurrentLocale
  const localeMap = localeStore.getLocaleMap
  const defaultLocal = await import(`../../locales/${locale.lang}.ts`)
  const message = defaultLocal.default ?? {}

  setHtmlPageLang(locale.lang)

  localeStore.setCurrentLocale({ lang: locale.lang })

  return {
    legacy: false, // 修复组件引入i18n时vite脚手架报错的问题
    locale: locale.lang,
    fallbackLocale: locale.lang,
    messages: {
      [locale.lang]: message
    },
    availableLocales: localeMap.map((v) => v.lang),
    sync: true,
    silentTranslationWarn: true, // 去掉警告
    missingWarn: false,
    silentFallbackWarn: true //抑制警告
  }
}

export const setupI18n = async (app: App<Element>) => {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
