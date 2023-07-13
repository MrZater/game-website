// 生成uuid
export function generateUUID(){
  let d = new Date().getTime() // 获取当前时间
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
    // 生成uuid的模板
    const r = (d + Math.random() * 16) % 16 | 0 // 生成随机数
    d = Math.floor(d / 16) // 更新时间
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16) // 根据模板生成uuid
  })
  return uuid // 返回uuid
}
