import { userAct } from '@/api/index'
export default function(routeName){
  // 添加窗口卸载事件监听
  window.addEventListener('beforeunload', event => {
    // 用户行为记录
    userAct('quit', routeName.value)
  })
}
