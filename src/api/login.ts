import http from "@/network"
interface ICount {
  name: string
  paw: string
}
interface IUserInfo {
  Userid: string
  Username: string
  StatusName?: string
  Message?: string
}
// 登录的接口
export const accountLogin = (account: ICount) =>
  http.get<IUserInfo>(
    "Login/InterUserLogin",
    {
      name: account.name,
      paw: account.paw,
      SystemName: "后台管理"
    },
    {
      isLogin: true
    }
  )

// 获取token
export const getUserToken = (account: ICount) =>
  http.post(
    "login",
    {
      username: account.name,
      password: account.paw
    },
    {
      isToken: true
    }
  )

// 获取用户的菜单
export const getUserMenu = (userInfo: IUserInfo) =>
  http.get(
    "system/menu/getLoginUserRouters",
    {
      userJob: userInfo.Userid,
      appCode: "envSafe",
      flag: 1
    },
    {
      isMenu: true
    }
  )

// //获取用户按钮权限
// export const getButton = () => http.get("getInfo", {}, { isMenu: true })

// // 根据工号获取对应的人员信息
// export const getUserInfo = (UserID: string) =>
//   http.get("Login/GetHRUser", { UserID }, { isLogin: true })
