import axios from "axios"
import router from "@/router"
// import { localCache, USER_TOKEN } from "@/utils/cache"
// 一些对应的类型
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"
interface IRequestConfig extends InternalAxiosRequestConfig {
  isLogin?: boolean
  isMenu?: boolean
  isToken?: boolean
  isOther?: boolean
  isSign?: boolean
}
class HyRequest {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    // 创建实例
    this.instance = axios.create(config)
    // 对应的请求拦截器
    this.instance.interceptors.request.use((config: IRequestConfig) => {
      if (config?.isLogin) {
        config.baseURL = import.meta.env.VITE_LOGIN_URL
      } else if (config?.isMenu) {
        config.baseURL = import.meta.env.VITE_MENU_URL
      } else if (config?.isToken) {
        config.baseURL = import.meta.env.VITE_TOKEN_URL
      } else if (config?.isOther) {
        config.baseURL = import.meta.env.VITE_OTHER_URL
      } else if (config?.isSign) {
        config.baseURL = import.meta.env.VITE_SEND_SIGN
      }
      return config
    })
    // 对应的响应拦截器
    this.instance.interceptors.response.use(
      (res: any) => {
        if (res.data.code == 401) {
          ElMessageBox.confirm("登录状态已过期，请重新登录", "系统提示", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            router.push("/login")
          })
        } else {
          return res.data.Resultvalue || res.data || res
        }
      },
      (err) => {
        return err
      }
    )
  }
  /**
   *
   * @param url 请求的地址(除去前缀的)
   * @param params get 请求的参数(params)
   * @param config 其他的一些参数 比如我们需要更换默认的前缀
   * @returns 返回的类型的通过 T 传入
   */
  get<T = any>(url: string, params?: any, config = {}): Promise<T> {
    let _params = reactive<any>({})
    if (Object.is(params, undefined)) {
      _params = ""
    } else {
      _params = "?"
      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return this.instance.get(`${url}${_params}`, { ...config })
  }
  post<T = any>(url: string, data?: Object, config = {}): Promise<T> {
    return this.instance.post(url, data, config)
  }
  download(url: string, data?: any) {
    this.instance.post(url, data, { responseType: "blob" }).then(
      (response: any) => {
        // console.log("res", response)
        const blob = new Blob([response], { type: "application/vnd.ms-excel" }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        const href = window.URL.createObjectURL(blob) // 返回内存中地址的字符串
        const downloadElement = document.createElement("a")
        downloadElement.href = href //	在适当的位置提供对象URL来使用文件。
        downloadElement.download = "historyReport.xlsx" // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      },
      (error) => {
        console.log("error", error)
      }
    )
  }
  upload<T = any>(url: string, data: any): Promise<T> {
    const formData = new FormData()
    formData.append("file", data)
    return this.instance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
  delete<T = any>(url: string, params?: Object, config = {}): Promise<T> {
    return this.instance.delete(url, {
      params,
      ...config
    })
  }
  put<T = any>(url: string, params?: Object, config = {}): Promise<T> {
    return this.instance.put(url, {
      ...params,
      ...config
    })
  }
}
export default new HyRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_TIME_OUT)
})
