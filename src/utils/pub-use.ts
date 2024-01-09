// 获取assets静态资源
const getAssetsFile = (url: string) => {
  return new URL(`@img/${url}`, import.meta.url).href
}
export default getAssetsFile
