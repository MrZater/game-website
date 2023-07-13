import { getGameList } from '@/api/index' // 导入获取主页栏和游戏列表的api函数
export function idSearch(id, pageRef, limitRef, totalRef, gameList){
  const getGameListByIdFunc = async() => {
    const { data } = await getGameList({
      // 调用api函数获取游戏列表数据
      categoryId: id.value, // 传入当前主页栏id
      page: pageRef.value, // 传入当前页
      pageSize: limitRef.value, // 传入每页显示数量
    })
    const { result = [], total = 0 } = data
    totalRef.value = total
    gameList.value = result
  }
  return { getGameListByIdFunc }
}
