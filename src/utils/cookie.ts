// 通过cookie将密码保存7天
import { Base64 } from "js-base64"
// //引入加密方式
// class LocalCookie {
//   // 设置cookie
//   setCookie(name: any, paw: any, days: any) {
//     const date = new Date() // 获取时间
//     date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days) // 保存的天数
//     // 字符串拼接cookie
//     window.document.cookie = "name" + "=" + name + ";path=/;expires=" + date.toUTCString()
//     window.document.cookie =
//       "paw" + "=" + Base64.encode(paw) + ";path=/;expires=" + date.toUTCString()
//   }
//   // 读取cookie 将用户名和密码回显到input框中
//   getCookie(key: any) {
//     if (document.cookie.length > 0) {
//       var start = document.cookie.indexOf(key + "=")
//       if (start !== -1) {
//         start = start + key.length + 1
//         var end = document.cookie.indexOf(";", start)
//         if (end === -1) end = document.cookie.length
//         return key == "name"
//           ? document.cookie.substring(start, end)
//           : Base64.decode(document.cookie.substring(start, end))
//       }
//     }
//     return ""
//   }
// }
// export default new LocalCookie()
