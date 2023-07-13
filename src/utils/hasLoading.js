// 判断是否是第一次进入页面
export default function(){
  // 获取session中的hasload
  const hasload = sessionStorage.getItem('hasload')
  // 如果没有hasload，设置hasload并返回false
  if (!hasload) {
    sessionStorage.setItem('hasload', 1)
    return false
  }
  // 如果有hasload，返回true
  return true
}
