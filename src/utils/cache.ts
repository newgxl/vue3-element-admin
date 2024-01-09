enum CacheType {
  local = "local",
  session = "session"
}

const USER_INFO: string = "USER_INFO"
const USER_MENU: string = "USER_MENU"
const USER_TOKEN: string = "USER_TOKEN"

class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }
  /**
   *  存储值
   * @param key 存储的key
   * @param value 对应的值
   */
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  /**
   * 读取值
   * @param key 存储的key值
   * @returns 放回的key 对应的值
   */
  getCache(key: string) {
    const value = this.storage.getItem(key)
    return value ? JSON.parse(value) : []
  }
  /**
   * 清除对应的key
   * @param key
   */
  deleteCache(key: string) {
    this.storage.removeItem(key)
  }
  /**
   * 清空所有的值
   */
  clearCache() {
    this.storage.clear()
  }
}
const localCache = new Cache(CacheType.local)
const sessionCache = new Cache(CacheType.session)
export { localCache, sessionCache, USER_INFO, USER_MENU, USER_TOKEN }
